<p align="center">
  <a href="https://babeljs.io/">
    <img alt="babel" src="https://raw.githubusercontent.com/babel/logo/master/babel.png" width="546">
  </a>
</p>

<p align="center">
  The compiler for writing next generation JavaScript.
</p>

<p align="center">
    <a href="https://npmx.dev/package/@babel/core"><img alt="npm Downloads" src="https://img.shields.io/npm/dm/@babel/core.svg?maxAge=43200&label=npm%20downloads&logo=babel&logoSize=auto"></a>
</p>
<p align="center">
  <a href="https://github.com/babel/babel/actions/workflows/ci.yml"><img alt="GitHub CI Status" src="https://github.com/babel/babel/actions/workflows/ci.yml/badge.svg?branch=main"></a>
  <a href="https://codecov.io/github/babel/babel"><img alt="Coverage Status" src="https://img.shields.io/codecov/c/github/babel/babel/main.svg?maxAge=43200&logo=codecov"></a>
  <a href="https://pkg.pr.new/~/babel/babel"><img alt="pkg.pr.new" src="https://img.shields.io/badge/PR_previews-pkg.pr.new-10a5e9"></a>
</p>
<p align="center">
  <a href="https://slack.babeljs.io/"><img alt="Slack Status" src="https://img.shields.io/badge/chat-on_slack-brightgreen?style=flat&logo=slack&logoColor=white"></a>
</p>

<h2 align="center">Supporting Babel</h2>

<p align="center">
  <a href="#backers"><img alt="Backers on Open Collective" src="https://opencollective.com/babel/backers/badge.svg" /></a>
  <a href="#sponsors"><img alt="Sponsors on Open Collective" src="https://opencollective.com/babel/sponsors/badge.svg" /></a>
  <a href="https://medium.com/friendship-dot-js/i-peeked-into-my-node-modules-directory-and-you-wont-believe-what-happened-next-b89f63d21558"><img alt="Business Strategy Status" src="https://img.shields.io/badge/business%20model-flavortown-green.svg"></a>
</p>

Babel (pronounced ["babble"](https://soundcloud.com/sebmck/how-to-pronounce-babel))  is a community-driven project used by many companies and projects, and is maintained by a group of [volunteers](https://babeljs.io/team). If you'd like to help support the future of the project, please consider:

- Giving developer time on the project. (Message us on [Twitter](https://twitter.com/babeljs) or [Slack](https://slack.babeljs.io/) for guidance!)
- Giving funds by becoming a sponsor on [Open Collective](https://opencollective.com/babel) or [GitHub](https://github.com/sponsors/babel/) (which goes to our Open Collective account)!

## Sponsors

Our top sponsors are shown below! [[Become a sponsor](https://opencollective.com/babel#sponsor)]

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

## Intro

Babel is a tool that helps you write code in the latest version of JavaScript. When your supported environments don't support certain features natively, Babel will help you compile those features down to a supported version.

**In**

```js
// ES2020 nullish coalescing
function greet(input) {
  return input ?? "Hello world";
}
```

**Out**

```js
function greet(input) {
  return input != null ? input : "Hello world";
}
```

Try it out at our [REPL](https://babel.dev/repl#?browsers=defaults&loose=true&code_lz=GYVwdgxgLglg9mABAcwE4FN1QBQzABxCgEpEBvAKEUQyhFST0KkQH5XEAiACXQBs-cRAHc4qPgBNOAbgoBfIA&shippedProposals=true&sourceType=script&lineWrap=true&presets=env%2Cenv&prettier=true&forceAllTransforms=true).

## FAQ

### Who maintains Babel?

Mostly a handful of volunteers, funded by you! Please check out our [team page](https://babeljs.io/team)!

### Is there a Babel song?

I'm so glad you asked: [Hallelujah —— In Praise of Babel](SONG.md) by [@angus-c](https://github.com/angus-c), [audio version](https://youtu.be/40abpedBKK8) by [@swyx](https://twitter.com/@swyx). Tweet us your recordings!

### Looking for support?

For questions and support please [join or open a GitHub Discussion](https://github.com/babel/babel/discussions), join our [Slack Community](https://slack.babeljs.io/) (you can [sign up here](https://slack.babeljs.io/) for an invite), ask a question on [Stack Overflow](https://stackoverflow.com/questions/tagged/babeljs), or ping us on [Bluesky](https://bsky.app/profile/babel.dev).

### Where are the docs?

Check out our website: [babeljs.io](https://babeljs.io/), and report issues/features at [babel/website](https://github.com/babel/website/issues).

### Want to report a bug or request a feature?

Please read through our [CONTRIBUTING.md](CONTRIBUTING.md) and fill out the issue template at [babel/issues](https://github.com/babel/babel/issues)!

### Want to contribute to Babel?

Check out:

- Our [#development](https://babeljs.slack.com/messages/development) Slack channel and say hi! ([sign-up](https://slack.babeljs.io))
- Issues with the [good first issue](https://github.com/babel/babel/labels/good%20first%20issue) and [help wanted](https://github.com/babel/babel/labels/help%20wanted) label. We suggest also looking at the [closed ones](https://github.com/babel/babel/issues?utf8=%E2%9C%93&q=is%3Aclosed+label%3A%22good+first+issue%22) to get a sense of the kinds of issues you can tackle.

Some resources:

- Our [CONTRIBUTING.md](CONTRIBUTING.md) to get started with setting up the repo.
- Our discussions/notes/roadmap: [babel/notes](https://github.com/babel/notes)
- Our progress on TC39 proposals: [babel/proposals](https://github.com/babel/proposals)
- Our blog which contains release posts and explanations: [/blog](https://babeljs.io/blog)
- Our videos page with talks about open source and Babel: [/videos](https://babeljs.io/videos)
- Our [podcast](https://podcast.babeljs.io)

### How is the repo structured?

The Babel repo is managed as a [monorepo](doc/design/monorepo.md) that is composed of many [npm packages](packages/README.md).

## License

[MIT](LICENSE)


## 🌐 Web Resources & Interactive Index
- [CAPYBARA SUIKA](https://skillplay.github.io/capybara-suika.html)
- [BRAINROT CLEANING](https://theskillquest.pages.dev/brainrot-cleaning.html)
- [HIDE ME](https://studyquesthub.web.app/hide-me.html)
- [CUTE ANIMAL WORLD](https://themindzone.pages.dev/cute-animal-world.html)
- [SPELUNKING](https://theskillquest.pages.dev/spelunking.html)
- [CATEGORY MINECRAFT 2](https://studyplayings.pages.dev/category-minecraft-2.html)
- [EPIC RACING DESCENT ON CARS](https://theskillquest.pages.dev/epic-racing-descent-on-cars.html)
- [CAR JAM ESCAPE](https://studyplayings.web.app/car-jam-escape.html)
- [GAS STATION JUNKYARD TYCOON](https://studyquests.github.io/gas-station-junkyard-tycoon.html)
- [TANGRAM PUZZLE](https://thequizzone.pages.dev/tangram-puzzle.html)
- [MAHJONG MASTERS](https://quizverses-9d2f2.web.app/mahjong-masters.html)
- [MAGIC FOREST MERGE THE SECRETS](https://quizverses.github.io/magic-forest-merge-the-secrets.html)
- [ARROW TAP PUZZLE](https://theskillquest.pages.dev/arrow-tap-puzzle.html)
- [GANG WAR STRIKE SHOOTER](https://theskillquest.pages.dev/gang-war-strike-shooter.html)
- [CATEGORY POOL 2](https://studyplayings.web.app/category-pool-2.html)
- [IDLE BASEBALL TYCOON](https://theskillquest.pages.dev/idle-baseball-tycoon.html)
- [RAGDOLL SOCCER 2 PLAYERS](https://thequizzone.pages.dev/ragdoll-soccer-2-players.html)
- [BLOCK LEGENDS](https://thequizzone.pages.dev/block-legends.html)
- [MICROPLASTICS FEEDING](https://theskillquest.pages.dev/microplastics-feeding.html)
- [COLOR NUTS](https://theskillquest.pages.dev/color-nuts.html)
- [KITTY SQUAD WINTER DRESS UP](https://studyplayings.pages.dev/kitty-squad-winter-dress-up.html)
- [ROBBY THE LAVA TSUNAMI](https://studyplayings.pages.dev/robby-the-lava-tsunami.html)
- [BALL AND GIRLFRIEND](https://thequizzone.pages.dev/ball-and-girlfriend.html)
- [KINGDOM WARS TD](https://quizverses-9d2f2.web.app/kingdom-wars-td.html)
- [STAR ATTACK 3D](https://themindzone.pages.dev/star-attack-3d.html)
- [INDEX17](https://themindzone.pages.dev/index17.html)
- [HEXA PUZZLE MASTER](https://themindzone.pages.dev/hexa-puzzle-master.html)
- [RUN FROM BABA YAGA](https://thequizzone.pages.dev/run-from-baba-yaga.html)
- [SPRUNKI LINK](https://studyquesthub.web.app/sprunki-link.html)
- [CODEQUEST](https://thequizzone.pages.dev/codequest.html)
- [THREAD SORT](https://thequizzone.pages.dev/thread-sort.html)
- [BARRY PRISON HIDE AND SEEK](https://themindzone.pages.dev/barry-prison-hide-and-seek.html)
- [RELAX MINI GAMES COLLECTION](https://theskillquest.pages.dev/relax-mini-games-collection.html)
- [DUCK HUNTING OPEN SEASON](https://theskillquest.pages.dev/duck-hunting-open-season.html)
- [CATEGORY FOOTBALL](https://theskillquest.pages.dev/category-football.html)
- [RUNNING LATE](https://studyquests.github.io/running-late.html)
- [EPIC RACING DESCENT ON CARS](https://learnquester.github.io/epic-racing-descent-on-cars.html)
- [BACKYARD DIG HOLE 3D SIMULATOR](https://themindzone.pages.dev/backyard-dig-hole-3d-simulator.html)
- [TERMS](https://studyquesthub.web.app/terms.html)
- [CATEGORY GUN241](https://studyplayings.web.app/category-gun241.html)
- [PET FALL](https://learnquester.github.io/pet-fall.html)
- [CATEGORY PUZZLE 8](https://theskillquest.pages.dev/category-puzzle-8.html)
- [SPECIAL HOLIDAY SOLITAIRE](https://themindzone.pages.dev/special-holiday-solitaire.html)
- [BODY CARE SIMULATOR](https://theskillquest.pages.dev/body-care-simulator.html)
- [HIDE SEEK GO AND FIND](https://quizverses.github.io/hide-seek-go-and-find.html)
- [CATEGORY INCREMENTAL388](https://learnquester.github.io/category-incremental388.html)
- [AVATAR MASTER FIX UP FACE](https://learnquester.github.io/avatar-master-fix-up-face.html)
- [SMARTLE](https://quizverses.github.io/smartle.html)
- [HAMSTER COMBO IDLE](https://theskillquest.pages.dev/hamster-combo-idle.html)
- [HEXA PUZZLE](https://thequizzone.pages.dev/hexa-puzzle.html)
- [CATEGORY CARTOON76](https://quizverses-9d2f2.web.app/category-cartoon76.html)
- [DIG FLOW SAVE WATER](https://theskillquest.pages.dev/dig-flow-save-water.html)
- [CATEGORY ARENA254](https://quizverses-9d2f2.web.app/category-arena254.html)
- [CATEGORY CLASSIC97](https://studyplayings.web.app/category-classic97.html)
- [BRICK BLAZE](https://studyquests.github.io/brick-blaze.html)
- [BRAIN FIND CAN YOU FIND IT](https://learnquester.github.io/brain-find-can-you-find-it.html)
- [CATEGORY CLASSIC98](https://studyplayings.web.app/category-classic98.html)
- [MAHJONG RIDDLES EGYPT](https://quizverses.github.io/mahjong-riddles-egypt.html)
- [CATEGORY FPS174](https://studyplayings.web.app/category-fps174.html)
- [CATEGORY CUTE](https://studyplayings.web.app/category-cute.html)
- [CATEGORY MEME BLOXY24](https://studyplayings.web.app/category-meme-bloxy24.html)
- [UNCLE BULLET 007](https://theskillquest.pages.dev/uncle-bullet-007.html)
- [CAT CUT](https://quizverses.pages.dev/cat-cut.html)
- [PARADISE JOURNEY MATCH3](https://quizverses.github.io/paradise-journey-match3.html)
- [CELEBRITY SPRING FASHION TRENDS](https://themindzone.pages.dev/celebrity-spring-fashion-trends.html)
- [FISHING CATCH THE SECRET BRAINROT](https://thequizzone.pages.dev/fishing-catch-the-secret-brainrot.html)
- [CASTLE CRAFT](https://iskillquest.pages.dev/castle-craft.html)
- [BUILD A ROLLERCOASTER SIMULATOR](https://iskillquest.pages.dev/build-a-rollercoaster-simulator.html)
- [OBBY CHAMPIONS](https://learnquester.github.io/obby-champions.html)
- [OM NOM RUN](https://quizverses.pages.dev/om-nom-run.html)
- [HIDDEN OBJECTS ISLAND SECRETS](https://theskillquest.pages.dev/hidden-objects-island-secrets.html)
- [CATEGORY PARKOUR55](https://studyplayings.web.app/category-parkour55.html)
- [CATEGORY THINKY](https://quizverses.pages.dev/category-thinky.html)
- [BUBBLE SHOOTER WONDERS OF EGYPT](https://themindzone.pages.dev/bubble-shooter-wonders-of-egypt.html)
- [INDEX11](https://iskillquest.pages.dev/index11.html)
- [MERGE LAGOON](https://iskillquest.pages.dev/merge-lagoon.html)
- [RESTAURANT VIP MASTERCHEF](https://studyquests.github.io/restaurant-vip-masterchef.html)
- [BLOCKS STACK RUSH](https://studyplaying.github.io/blocks-stack-rush.html)
- [2048 CUBE MERGE](https://quizverses.github.io/2048-cube-merge.html)
- [BRAINROT BOING BOING MERGE](https://theskillquest.pages.dev/brainrot-boing-boing-merge.html)
- [CYBER ARROW](https://learnquester.github.io/cyber-arrow.html)
- [GOING BALLS 3D](https://themindzone.pages.dev/going-balls-3d.html)
- [INDEX27](https://iskillquest.pages.dev/index27.html)
- [INDEX11](https://quizverses-9d2f2.web.app/index11.html)
- [CATEGORY SHOOTER](https://studyplaying.github.io/category-shooter.html)
- [DEEP IN THE LAB CHAPTER 1](https://theskillquest.pages.dev/deep-in-the-lab-chapter-1.html)
- [GIRL RESCUE DRAGON OUT](https://studyquests.github.io/girl-rescue-dragon-out.html)
- [HAWAII MATCH 6](https://theskillquest.pages.dev/hawaii-match-6.html)
- [CATEGORY JUMP SCARE21](https://theskillquest.pages.dev/category-jump-scare21.html)
- [CATEGORY BATTLE ROYALE](https://iskillquest.pages.dev/category-battle-royale.html)
- [CATEGORY PIXEL313](https://studyplaying.github.io/category-pixel313.html)
- [SAVE THE SHEEP](https://thequizzone.pages.dev/save-the-sheep.html)
- [STICKMAN MEGA BOSS BATTLES](https://learnquester.github.io/stickman-mega-boss-battles.html)
- [CRAZY PLANE LANDING](https://quizverses.github.io/crazy-plane-landing.html)
- [VEX 9](https://theskillquest.pages.dev/vex-9.html)
- [CATEGORY PHYSICS371](https://studyplayings.web.app/category-physics371.html)
- [SUMMER RIDER 3D](https://theskillquest.pages.dev/summer-rider-3d.html)
- [TREASURE SEEKER](https://quizverses-9d2f2.web.app/treasure-seeker.html)
- [SKYDOM](https://studyquests.github.io/skydom.html)
- [SWIM GOOD](https://theskillquest.pages.dev/swim-good.html)
- [CATEGORY CONTROLLER 2](https://studyplayings.web.app/category-controller-2.html)
- [CATEGORY RAMMERHEAD](https://iskillquest.pages.dev/category-rammerhead.html)
- [SATISDOM](https://iskillquest.pages.dev/satisdom.html)
- [WEDNESDAY DARK ACADEMIA](https://themindzone.pages.dev/wednesday-dark-academia.html)
- [CATEGORY INTERSTELLAR](https://studyquests.github.io/category-interstellar.html)
- [CATEGORY HORROR](https://iskillquest.pages.dev/category-horror.html)
- [WEAPONS AND RAGDOLLS](https://studyquests.github.io/weapons-and-ragdolls.html)
- [CAPYBARA XMAS MERGE](https://themindzone.pages.dev/capybara-xmas-merge.html)
- [TRACESOCCER UBC](https://studyquesthub.web.app/tracesoccer-ubc.html)
- [PAINT MASTER](https://quizverses.github.io/paint-master.html)
- [CATEGORY CASUAL 4](https://studyquesthub.web.app/category-casual-4.html)
- [MINEBLOCK OBBY](https://thequizzone.pages.dev/mineblock-obby.html)
- [WORD VOYAGER](https://theskillquest.pages.dev/word-voyager.html)
- [CATEGORY CAN T STOP PLAYING215](https://quizverses.github.io/category-can-t-stop-playing215.html)
- [INDEX19](https://iskillquest.pages.dev/index19.html)
- [CELEBRITY SPRING MANICURE DESIGN](https://learnquester.github.io/celebrity-spring-manicure-design.html)
- [321 CHOOSE THE DIFFERENT](https://themindzone.pages.dev/321-choose-the-different.html)
- [ZIP ZAP](https://thequizzone.pages.dev/zip-zap.html)
- [INDEX30](https://iskillquest.pages.dev/index30.html)
- [CATEGORY OBBY56](https://studyplaying.github.io/category-obby56.html)
- [HEIST DEFENDER](https://studyquesthub.web.app/heist-defender.html)
- [SORT WATER NOW](https://studyplaying.github.io/sort-water-now.html)
- [LAMPHEAD](https://theskillquest.pages.dev/lamphead.html)
- [9 BLOCKS](https://themindzone.pages.dev/9-blocks.html)
- [STICK HERO BATTLE](https://themindzone.pages.dev/stick-hero-battle.html)
- [CUTE SHEEP SKYBLOCK](https://studyquests.github.io/cute-sheep-skyblock.html)
- [CATEGORY CARDS](https://studyquests.github.io/category-cards.html)
- [FUN OBBY EXTREME](https://studyquests.github.io/fun-obby-extreme.html)
- [HEROES OF THE ARENA](https://studyquests.github.io/heroes-of-the-arena.html)
- [MOJICON GARDEN CONNECT](https://quizverses.github.io/mojicon-garden-connect.html)
