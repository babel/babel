<p align="center">
  <a href="https://babeljs.io/">
    <img alt="babel" src="https://raw.githubusercontent.com/babel/logo/master/babel.png" width="546">
  </a>
</p>

<p align="center">
  The compiler for writing next generation JavaScript.
</p>

<p align="center">
  <a href="https://travis-ci.org/babel/babel"><img alt="Travis Status" src="https://img.shields.io/travis/babel/babel/master.svg?label=travis&maxAge=43200"></a>
  <a href="https://circleci.com/gh/babel/babel"><img alt="CircleCI Status" src="https://img.shields.io/circleci/project/github/babel/babel/master.svg?label=circle&maxAge=43200"></a>
  <a href="https://codecov.io/github/babel/babel"><img alt="Coverage Status" src="https://img.shields.io/codecov/c/github/babel/babel/master.svg?maxAge=43200"></a>
  <a href="https://slack.babeljs.io/"><img alt="Slack Status" src="https://slack.babeljs.io/badge.svg"></a>
  <a href="https://www.npmjs.com/package/babel-core"><img alt="npm Downloads" src="https://img.shields.io/npm/dm/babel-core.svg?maxAge=43200"></a>
</p>

<h2 align="center">Supporting Babel</h2>

<p align="center">
  <a href="#backers"><img alt="Backers on Open Collective" src="https://opencollective.com/babel/backers/badge.svg" /></a>
  <a href="#sponsors"><img alt="Sponsors on Open Collective" src="https://opencollective.com/babel/sponsors/badge.svg" /></a>
  <a href="https://medium.com/friendship-dot-js/i-peeked-into-my-node-modules-directory-and-you-wont-believe-what-happened-next-b89f63d21558"><img alt="Business Strategy Status" src="https://img.shields.io/badge/business%20model-flavortown-green.svg"></a>
</p>

Babel is community-driven and thus mostly maintained by a group of volunteers. It has a lot of [companies and projects](http://babeljs.io/users) using it but almost no sponsors/people funded to work on it. If you'd like to help maintain the future of the project, please consider:

- Giving developer time on the project. (Message us on [Twitter](https://twitter.com/babeljs) or [Slack](slack.babeljs.io))
- [Giving funds by becoming a backer/sponsor on OpenCollective](https://opencollective.com/babel)

## Intro

Babel is a tool that helps you write code in the latest version of JavaScript. When your supported environments don't support certain features natively, Babel will help you compile those features down to a supported version.

**In**

```js
// ES2015 arrow function
[1, 2, 3].map((n) => n + 1);
```

**Out**

```js
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

Try it out at our [REPL](https://babeljs.io/repl/build/master#?code_lz=NoRgNATGDMC6B0BbAhgBwBQDsAEBeAfNjgNTYgCUA3EA&lineWrap=true&presets=es2015%2Ces2016%2Ces2017&version=7.0.0-beta.2).

- [FAQ](#faq)
- [Team](#team)
- [Backers](#backers)
- [Sponsors](#sponsors)
- [License](#license)

## FAQ

### Docs?

Check out our website: [babeljs.io](http://babeljs.io/)

### Looking for support?

For questions and support please visit join our [Slack Community](https://slack.babeljs.io/), ask a question on [Stack Overflow](http://stackoverflow.com/questions/tagged/babeljs), or ping us on [Twitter](https://twitter.com/babeljs/).

### Want to report a bug or request a feature?

Please read through our [CONTRIBUTING.md](https://github.com/babel/babel/blob/master/CONTRIBUTING.md) and fill out the issue template at [babel/issues](https://github.com/babel/babel/issues)!

### Want to report an issue with our website ([babeljs.io](https://babeljs.io))?

For docs/website issues please visit the [babel/website](https://github.com/babel/website/issues).

### Want to contribute to Babel?

Check out our [CONTRIBUTING.md](https://github.com/babel/babel/blob/master/CONTRIBUTING.md) to get started with setting up the repo.

- If you have already joined Slack, join our [#development](https://babeljs.slack.com/messages/development) channel and say hi!
- Check out the issues with the [good first issue](https://github.com/babel/babel/labels/good first issue) and [help-wanted](https://github.com/babel/babel/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) label.
- Our discussions/notes/roadmap: [babel/notes](https://github.com/babel/notes)
- Our progress on TC39 proposals: [babel/proposals](https://github.com/babel/proposals)

### How is the repo structured?

The Babel repo is managed as a [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) that is composed of many [npm packages](/packages#readme).

## Team

### Core members

[![Babel](https://avatars.githubusercontent.com/u/9637642?s=64)](https://github.com/babel) | [![Daniel Tschinder](https://avatars.githubusercontent.com/u/231804?s=64)](https://github.com/danez) | [![Logan Smyth](https://avatars.githubusercontent.com/u/132260?s=64)](https://github.com/loganfsmyth) | [![Henry Zhu](https://avatars.githubusercontent.com/u/588473?s=64)](https://github.com/hzoo) |
|---|---|---|---|
Babel | Daniel Tschinder | Logan Smyth | Henry Zhu |
:octocat: [@babel](https://github.com/babel) | [@danez](https://github.com/danez) | [@loganfsmyth](https://github.com/loganfsmyth) | [@hzoo](https://github.com/hzoo) |
:bird: [@babeljs](https://twitter.com/babeljs) | [@TschinderDaniel](https://twitter.com/TschinderDaniel) | [@loganfsmyth](https://twitter.com/loganfsmyth) | [@left_pad](https://twitter.com/left_pad) |

### Members

[![Andrew Levine](https://avatars.githubusercontent.com/u/5233399?s=64)](https://github.com/drewml) | [![Boopathi Rajaa](https://avatars.githubusercontent.com/u/294474?s=64)](https://github.com/boopathi) | [![Brian Ng](https://avatars.githubusercontent.com/u/56288?s=64)](https://github.com/existentialism) | [![Dan Harper](https://avatars.githubusercontent.com/u/510740?s=64)](https://github.com/danharper) | [![diogo franco](https://avatars.githubusercontent.com/u/73085?s=64)](https://github.com/kovensky) | [![Aaron Ang](https://avatars1.githubusercontent.com/u/7579804?s=64)](https://github.com/aaronang) | [![Artem Yavorsky](https://avatars2.githubusercontent.com/u/1521229?s=64)](https://github.com/yavorsky) |
|---|---|---|---|---|---|---|
| Andrew Levine | Boopathi Rajaa | Brian Ng | Dan Harper | Diogo Franco | Aaron Ang | Artem Yavorsky |
| [@drewml](https://github.com/drewml) | [@boopathi](https://github.com/boopathi) | [@existentialism](https://github.com/existentialism) | [@danharper](https://github.com/danharper) | [@kovensky](https://github.com/kovensky) | [@aaronang](https://github.com/aaronang) | [@yavorsky](https://github.com/yavorsky) |
| [@drewml](https://twitter.com/drewml) | [@heisenbugger](https://twitter.com/heisenbugger) | [@existentialism](https://twitter.com/existentialism) | [@DanHarper7](https://twitter.com/DanHarper7) | [@kovnsk](https://twitter.com/kovnsk) | [@_aaronang](https://twitter.com/_aaronang) | [@yavorsky_](https://twitter.com/yavorsky_) |

[![Juriy Zaytsev](https://avatars.githubusercontent.com/u/383?s=64)](https://github.com/kangax) | [![Kai Cataldo](https://avatars.githubusercontent.com/u/7041728?s=64)](https://github.com/kaicataldo) | [![Moti Zilberman](https://avatars.githubusercontent.com/u/2246565?s=64)](https://github.com/motiz88) | [![Sven Sauleau](https://avatars3.githubusercontent.com/u/1493671?s=64)](https://github.com/xtuc) | [![Samuel Reed](https://avatars3.githubusercontent.com/u/1197375?s=64)](https://github.com/STRML) | [![Sergey Rubanov](https://avatars1.githubusercontent.com/u/1507086?s=64)](https://github.com/chicoxyzzy) |
|---|---|---|---|---|---|
| Juriy Zaytsev | Kai Cataldo | Moti Zilberman | Sven Sauleau | Samuel Reed | Sergey Rubanov |
| [@kangax](https://github.com/kangax) | [@kaicataldo](https://github.com/kaicataldo) | [@motiz88](https://github.com/motiz88) | [@xtuc](https://github.com/xtuc) | [@STRML](https://github.com/STRML) | [@chicoxyzzy](https://github.com/chicoxyzzy) |
| [@kangax](https://twitter.com/kangax) | [@kai_cataldo](https://twitter.com/kai_cataldo) | [@motiz88](https://twitter.com/motiz88) | [@svensauleau](https://twitter.com/svensauleau) | [@STRML_](https://twitter.com/STRML_) | [@chicoxyzzy](https://twitter.com/chicoxyzzy) |

### Non-Human Members

[<img src="https://github.com/babel/babel-bot/raw/master/babel-bot.png" height="64">](https://github.com/babel-bot) |
|---|
| Babel Bot |
| [@babel-bot](https://github.com/babel-bot) |
| [@babeljs](https://twitter.com/babeljs) |

### Inactive members

[![Amjad Masad](https://avatars.githubusercontent.com/u/587518?s=64)](https://github.com/amasad) | [![James Kyle](https://avatars.githubusercontent.com/u/952783?s=64)](https://github.com/thejameskyle) | [![Jesse McCarthy](https://avatars.githubusercontent.com/u/129203?s=64)](https://github.com/jmm) | [![Sebastian McKenzie](https://avatars.githubusercontent.com/u/853712?s=64)](https://github.com/kittens) (Creator) |
|---|---|---|---|
Amjad Masad | James Kyle | Jesse McCarthy | Sebastian McKenzie |
[@amasad](https://github.com/amasad) | [@thejameskyle](https://github.com/thejameskyle) | [@jmm](https://github.com/jmm) | [@sebmck](https://twitter.com/sebmck) |
| [@amasad](https://twitter.com/amasad) | [@thejameskyle](https://twitter.com/thejameskyle) | [@mccjm](https://twitter.com/mccjm) | [@kittens](https://github.com/kittens)

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/babel#backer)]

<a href="https://opencollective.com/babel/backer/0/website" target="_blank"><img src="https://opencollective.com/babel/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/babel/backer/1/website" target="_blank"><img src="https://opencollective.com/babel/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/babel/backer/2/website" target="_blank"><img src="https://opencollective.com/babel/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/babel/backer/3/website" target="_blank"><img src="https://opencollective.com/babel/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/babel/backer/4/website" target="_blank"><img src="https://opencollective.com/babel/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/babel/backer/5/website" target="_blank"><img src="https://opencollective.com/babel/backer/5/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/6/website" target="_blank"><img src="https://opencollective.com/babel/backer/6/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/7/website" target="_blank"><img src="https://opencollective.com/babel/backer/7/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/8/website" target="_blank"><img src="https://opencollective.com/babel/backer/8/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/9/website" target="_blank"><img src="https://opencollective.com/babel/backer/9/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/10/website" target="_blank"><img src="https://opencollective.com/babel/backer/10/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/11/website" target="_blank"><img src="https://opencollective.com/babel/backer/11/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/12/website" target="_blank"><img src="https://opencollective.com/babel/backer/12/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/13/website" target="_blank"><img src="https://opencollective.com/babel/backer/13/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/14/website" target="_blank"><img src="https://opencollective.com/babel/backer/14/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/15/website" target="_blank"><img src="https://opencollective.com/babel/backer/15/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/16/website" target="_blank"><img src="https://opencollective.com/babel/backer/16/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/17/website" target="_blank"><img src="https://opencollective.com/babel/backer/17/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/18/website" target="_blank"><img src="https://opencollective.com/babel/backer/18/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/19/website" target="_blank"><img src="https://opencollective.com/babel/backer/19/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/20/website" target="_blank"><img src="https://opencollective.com/babel/backer/20/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/21/website" target="_blank"><img src="https://opencollective.com/babel/backer/21/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/22/website" target="_blank"><img src="https://opencollective.com/babel/backer/22/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/23/website" target="_blank"><img src="https://opencollective.com/babel/backer/23/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/24/website" target="_blank"><img src="https://opencollective.com/babel/backer/24/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/25/website" target="_blank"><img src="https://opencollective.com/babel/backer/25/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/26/website" target="_blank"><img src="https://opencollective.com/babel/backer/26/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/27/website" target="_blank"><img src="https://opencollective.com/babel/backer/27/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/28/website" target="_blank"><img src="https://opencollective.com/babel/backer/28/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/backer/29/website" target="_blank"><img src="https://opencollective.com/babel/backer/29/avatar.svg"></a>

## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/babel#sponsor)]

<a href="https://opencollective.com/babel/sponsor/0/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/babel/sponsor/1/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/babel/sponsor/2/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/babel/sponsor/3/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/babel/sponsor/4/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/4/avatar.svg"></a>
 <a href="https://opencollective.com/babel/sponsor/5/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/5/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/6/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/6/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/7/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/7/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/8/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/8/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/9/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/9/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/10/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/10/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/11/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/11/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/12/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/12/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/13/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/13/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/14/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/14/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/15/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/15/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/16/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/16/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/17/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/17/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/18/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/18/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/19/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/19/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/20/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/20/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/21/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/21/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/22/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/22/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/23/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/23/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/24/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/24/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/25/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/25/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/26/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/26/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/27/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/27/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/28/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/28/avatar.svg"></a>		
  <a href="https://opencollective.com/babel/sponsor/29/website" target="_blank"><img src="https://opencollective.com/babel/sponsor/29/avatar.svg"></a>

## License

[MIT](https://github.com/babel/babel/blob/master/LICENSE)
