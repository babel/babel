babel-env-standalone
=================

babel-env-standalone is a standalone build of [babel-preset-env](https://github.com/babel/babel-preset-env) for use in non-Node.js environments, including browsers.

Installation
============

There are several ways to get a copy of babel-preset-env. Pick whichever one you like:

- Install via NPM: `npm install --save babel-env-standalone`
- Manually grab `babel-preset-env.js` and/or `babel-preset-env.min.js` from the [GitHub releases page](https://github.com/babel/babel/releases). Every release includes these files.

Usage
=====

Load `babel-preset-env.js` or `babel-preset-env.min.js` in your environment, **along with Babel-standalone**. This is important: You need to load Babel too!
