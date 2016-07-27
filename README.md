[![Build Status](https://travis-ci.org/Nord-HI/nord.is.svg?branch=master)](https://travis-ci.org/Nord-HI/nord.is)
[![Coverage Status](https://coveralls.io/repos/github/Nord-HI/nord.is/badge.svg?branch=master)](https://coveralls.io/github/Nord-HI/nord.is?branch=master)
[![Dependency Status](https://david-dm.org/Nord-HI/nord.is.svg)](https://david-dm.org/Nord-HI/nord.is)
[![devDependency Status](https://david-dm.org/Nord-HI/nord.is/dev-status.svg)](https://david-dm.org/Nord-HI/nord.is#info=devDependencies)

---

The source code of https://nord.is.

- [Getting Started](#getting-started)
- [Commands](#commands)
  - [start](#start)
  - [build](#build)
  - [test](#test)
  - [clean](#clean)
- [Changelog](#changelog)


## Getting Started

```sh
$ npm install
```

Start the local dev server:

```sh
$ npm start
```

Navigate to **http://localhost:8080/** to view the app.

## Commands

You can find all the commands in the `scripts` section of [package.json](package.json).

### start

```sh
$ npm start
```

**Input:** `src/main.jsx`

This leverages [React Hot Loader](https://github.com/gaearon/react-hot-loader) to automatically start a local dev server and refresh file changes on the fly without reloading the page.

It also automatically includes source maps, allowing you to browse code and set breakpoints on the original ES6 code:

### build

```sh
$ npm run build
```

**Input:** `src/client/main.jsx`

**Output:** `build/app.js`

Build minified app for production using the [production](http://webpack.github.io/docs/cli.html#production-shortcut-p) shortcut.

### test

```sh
$ npm test
```

**Input:** all files in directories named `__test__`


### clean

```sh
$ npm run clean
```

**Input:** `build/app.js`

Removes the compiled app file from build.

## [Changelog](CHANGELOG.md)
