-- We begin a transaction so that if any SQL statement fails, none of the
-- changes will be applied.
begin;

-- We want to cryptographically hash passwords, therefore create this
-- extension.
create extension if not exists pgcrypto;

-- Create the schema we are going to use.
create schema nord;

-- Create a schema to host the utilities for our schema. The reason it is in
-- another schema is so that it can be private.
create schema nord_utils;

-- By setting the `search_path`, whenever we create something in the default
-- namespace it is actually created in the `nord` schema.
--
-- For example, this lets us write `create table person …` instead of
-- `create table nord.person …`.
set search_path = nord, nord_utils, public;

-------------------------------------------------------------------------------
-- Public Tables

create table person (
  id               serial not null primary key,
  given_name       varchar(64) not null,
  family_name      varchar(64),
  about            text,
  created_at       timestamp,
  updated_at       timestamp
);

comment on table person is 'A user of the forum.';
comment on column person.id is 'The primary key for the person.';
comment on column person.given_name is 'The person’s first name.';
comment on column person.family_name is 'The person’s last name.';
comment on column person.about is 'A short description about the user, written by the user.';
comment on column person.created_at is 'The time this person was created.';
comment on column person.updated_at is 'The latest time this person was updated.';

create type post_topic as enum ('discussion', 'inspiration', 'help');

create table post (
  id               serial not null primary key,
  author_id        int not null references person(id),
  headline         text not null,
  topic            post_topic,
  body             text,
  created_at       timestamp,
  updated_at       timestamp
);

comment on table post is 'A forum post written by a user.';
comment on column post.id is 'The primary key for the post.';
comment on column post.headline is 'The title written by the user.';
comment on column post.author_id is 'The id of the author user.';
comment on column post.topic is 'The topic this has been posted in.';
comment on column post.body is 'The main body text of our post.';
comment on column post.created_at is 'The time this post was created.';
comment on column post.updated_at is 'The latest time this post was updated.';

-------------------------------------------------------------------------------
-- Private Tables

create table nord_utils.person_account (
  person_id        int not null primary key,
  email            varchar not null unique check (email ~* '^.+@.+\..+$'),
  pass_hash        char(60) not null
);

comment on table person_account is 'Private information about a person’s account.';
comment on column person_account.person_id is 'The id of the person associated with this account.';
comment on column person_account.email is 'The email address of the person.';
comment on column person_account.pass_hash is 'An opaque hash of the person’s password.';

-------------------------------------------------------------------------------
-- Query Procedures

-- Computes the full name for a person using the person’s `given_name` and a
-- `family_name`.
create function person_full_name(person) returns varchar as $$
  select $1.given_name || ' ' || $1.family_name
$$ language sql
stable;

comment on function person_full_name(person) is 'A person’s full name including their first and last name.';

-- Fetches and returns the latest post authored by our person.
create function person_latest_post(person) returns post as $$
  select *
  from post
  where author_id = $1.id
  order by created_at desc
  limit 1
$$ language sql
stable
set search_path from current;

comment on function person_latest_post(person) is 'Get’s the latest post written by the person.';

-- Truncates the body with a given length and a given omission character. The
-- reason we don’t use defaults is because PostGraphQL will always send three
-- parameters and if one parameter is null, the default won’t be used.
create function post_summary(
  post,
  length int,
  omission varchar
) returns text as $$
  select case
    when $1.body is null then null
    else substring($1.body from 0 for coalesce(length, 50)) || coalesce(omission, '…')
  end
$$ language sql
stable;

comment on function post_summary(post, int, varchar) is 'A truncated version of the body for summaries.';

-- A procedure to search the headline and body of all posts using a given
-- search term.
create function search_posts(search varchar) returns setof post as $$
  select * from post where headline ilike ('%' || search || '%') or body ilike ('%' || search || '%')
$$ language sql
stable
set search_path from current;

comment on function search_posts(varchar) is 'Returns posts containing a given search term.';

-------------------------------------------------------------------------------
-- Mutation Procedures

-- Registers a person in our forum with a few key parameters creating a
-- `person` row and an associated `person_account` row.
create function register_person(
  given_name varchar,
  family_name varchar,
  email varchar,
  password varchar
) returns person as $$
declare
  row person;
begin
  -- Insert the person’s public profile data.
  insert into person (given_name, family_name) values
    (given_name, family_name)
    returning * into row;

  -- Insert the person’s private account data.
  insert into person_account (person_id, email, pass_hash) values
    (row.id, email, crypt(password, gen_salt('bf')));

  return row;
end;
$$ language plpgsql
strict
set search_path from current;

comment on function register_person(varchar, varchar, varchar, varchar) is 'Register a person in our forum.';

-------------------------------------------------------------------------------
-- Triggers

-- First we must define two utility functions, `set_created_at` and
-- set_updated_at` which we will use for our triggers.
--
-- Note that we also create them in `nord_utils` as we want them to be
-- private and not exposed.
--
-- Triggers taken initially from the Rust [Diesel][1] library, documentation
-- for `is distinct from` can be found [here][2].
--
-- [1]: https://github.com/diesel-rs/diesel/blob/1427b9f/diesel/src/pg/connection/setup/timestamp_helpers.sql
-- [2]: https://wiki.postgresql.org/wiki/Is_distinct_from

create function nord_utils.set_created_at() returns trigger as $$
begin
  -- We will let the inserter manually set a `created_at` time if they desire.
  if (new.created_at is null) then
    new.created_at := current_timestamp;
  end if;
  return new;
end;
$$ language plpgsql;

create function nord_utils.set_updated_at() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;

-- Next we must actually define our triggers for all tables that need them.
--
-- This is not a good example to copy if you are looking for a good way to
-- indent and style your trigger statements. They are all on one line to
-- conserve space :)

create trigger created_at before insert on person for each row execute procedure set_created_at();
create trigger updated_at before update on person for each row execute procedure set_updated_at();
create trigger created_at before insert on post for each row execute procedure set_created_at();
create trigger updated_at before update on post for each row execute procedure set_updated_at();

-------------------------------------------------------------------------------
-- Permissions

grant select on person, post to public;

-- Commit all the changes from this transaction. If any statement failed,
-- these statements will not have succeeded.
commit;
