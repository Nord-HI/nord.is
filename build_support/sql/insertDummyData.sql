-------------------------------------------------------------------------------
-- Sample Data

insert into person (id, name, ugla_user) values
  (1, 'Kathryn', 'username'),
  (2, 'Johnny', 'username'),
  (3, 'Nancy', 'username'),
  (4, 'Russell', 'username'),
  (5, 'Ann', 'username'),
  (6, 'Joe', 'username'),
  (7, 'Scott', 'username'),
  (8, 'David', 'username'),
  (9, 'Carl', 'username'),
  (10, 'Jonathan', 'username'),
  (11, 'Beverly', 'username'),
  (12, 'Kelly', 'username'),
  (13, 'Nicholas', 'username'),
  (14, 'Carol', 'username');

alter sequence person_id_seq restart with 15;

insert into post (id, author_id, headline, topic, body) values
  (1, 2, 'No… It’s a thing; it’s like a plan, but with more greatness.', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper, sem sed pulvinar rutrum, nisl dui faucibus velit, eget sodales urna mauris nec lorem. Vivamus faucibus augue sit amet semper fringilla. Cras nec vulputate eros. Proin fermentum purus posuere ipsum accumsan interdum. Nunc vitae urna non mauris pellentesque sodales vel nec elit. Suspendisse pulvinar ornare turpis ac vestibulum. Cras eu congue magna. Nulla vel sodales enim, vel semper dolor. Curabitur pellentesque dolor elit. Aenean cursus posuere dui, vitae mollis felis rhoncus ac. In at orci a erat congue consequat ut sed risus. Etiam euismod elit eu lobortis varius. Praesent lacinia lobortis nisi, vel faucibus turpis sodales in. In interdum lectus tellus, facilisis mollis diam feugiat vitae.'),
  (2, 1, 'I hate yogurt. It’s just stuff with bits in.', 'inspiration', null),
  (3, 1, 'Is that a cooking show?', 'inspiration', null),
  (4, 1, 'You hit me with a cricket bat.', null, null),
  (5, 5, 'Please, Don-Bot… look into your hard drive, and open your mercy file!', null, null),
  (6, 3, 'Stop talking, brain thinking. Hush.', null, null),
  (7, 1, 'Large bet on myself in round one.', 'discussion', null),
  (8, 2, 'It’s a fez. I wear a fez now. Fezes are cool.', 'inspiration', null),
  (9, 3, 'You know how I sometimes have really brilliant ideas?', null, null),
  (10, 2, 'What’s with you kids? Every other day it’s food, food, food.', 'discussion', null),
  (11, 3, 'They’re not aliens, they’re Earth…liens!', 'help', null),
  (12, 5, 'You’ve swallowed a planet!', null, null);

alter sequence post_id_seq restart with 13;
