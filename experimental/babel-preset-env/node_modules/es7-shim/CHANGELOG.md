6.0.0 / 2016-07-05
=================
  * [Breaking] remove `Map#toJSON`/`Set#toJSON`, since they were rejected by TC39
  * [Breaking] Remove `SIMD` shim (out of date + unpolyfillable)
  * [Breaking] Remove `RegExp.escape`, since it was rejected by TC39
  * [Deps] update `array-includes`, `object.getownpropertydescriptors`, `string.prototype.trimright`, `string.prototype.trimleft`
  * [Fix] fix “main” in bower.json/component.json (#15)
  * [Tests] up to `node` `v6.2`, `v5.12`, `v4.4`
  * [Tests] use pretest/posttest for linting/security
  * [Dev Deps] update `tape`, `browserify`, `uglify-js`, `jscs`, `nsp`, `eslint`, `@ljharb/eslint-config`, `es6-promise`, `semver`

5.0.0 / 2015-11-17
=================
  * [Breaking] Rename `String#{padLeft,padRight}` → `String#{padStart,padEnd}`
  * [Deps] update `object.entries`, `object.values`
  * [Dev Deps] update `jscs`, `tape`, `eslint`, `@ljharb/eslint-config`, `uglify-js`, `nsp`, `browserify`
  * [Tests] up to `node` `v5.0`
  * [Tests] fix npm upgrades on older node versions
  * [Docs] Add `npm` keywords and author
  * [Docs] Add `trimLeft`/`trimRight` to README

4.3.1 / 2015-09-26
=================
  * [Deps] update `object.entries`, `object.values`, `string.prototype.padleft`, `string.prototype.padright`
  * [Test] on `node` `v4.1`
  * [Dev Deps] update `browserify`, `eslint`, `@ljharb/eslint-config`, `semver`

4.3.0 / 2015-09-23
=================
  * Add `Object.entries` and `Object.values`
  * [Deps] update `array-includes`
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `jscs`, `tape`, `es6-promise`, `nsp`
  * [Tests] up to `io.js` `v3.3`, `node` `v4.1`
  * [Docs] Switch from vb.teelaun.ch to versionbadg.es for the npm version badge SVG.
  * [Docs] Fix license field in package.json

4.2.0 / 2015-07-30
=================
  * Add `String#padLeft` and `String#padRight`

4.1.0 / 2015-07-29
=================
  * Add `String#trimLeft` and `String#trimRight`
  * [Deps] Update `object.getownpropertydescriptors`, `regexp.escape`
  * [Dev deps] Update `eslint`, `nsp`, `browserify`, `semver`, `tape`, `uglify-js`

4.0.0 / 2015-06-17
=================
  * Update `simd` to `v2.0.0`

3.1.0 / 2015-06-16
=================
  * Add `RegExp.escape`
  * Test up to `io.js` `v2.3`
  * Update dev deps: `browserify`, `es6-promise`, `eslint`, `semver`

3.0.0 / 2015-05-23
=================
  * Update `array-includes` to not skip holes

2.1.0 / 2015-05-23
=================
  * Add `SIMD` shim
  * Minor updates to `Map#toJSON`, `Set#toJSON`, `Object.getOwnPropertyDescriptors`, `String#at`, `Array#includes`
  * Update `eslint`, `browserify`, `uglify-js`, `covert`, `jscs`, `semver`

2.0.0 / 2015-04-26
=================
  * Update `Map#toJSON` and `Set#toJSON`

1.3.0 / 2015-04-22
=================
  * Add `Map#toJSON` and `Set#toJSON`
  * Test on latest `io.js` versions.
  * Update `jscs`, `semver`, `uglify-js`, `eslint`, `tape`, `browserify`

1.2.1 / 2015-03-21
=================
  * Update built distribution files

1.2.0 / 2015-03-20
=================
  * Add `String#at`
  * Update `object.getownpropertydescriptors`
  * Test on latest `io.js` versions.

1.1.1 / 2015-03-19
=================
  * Update `browserify`, `uglify-js`, `editorconfig-tools`, `nsp`, `eslint`, `semver`
  * Update `array-includes`

1.1.0 / 2015-02-17
=================
  * Add Object.getOwnPropertyDescriptors via https://www.npmjs.com/package/object.getownpropertydescriptors
  * Add standalone links to README
  * All grade A-supported `node`/`iojs` versions now ship with an `npm` that understands `^`.
  * Run `travis-ci` tests on `iojs` and `node` v0.12; speed up builds; allow 0.8/0.11/0.4 failures.
  * Update `tape`, `browserify`, `jscs`, `eslint`

1.0.5 / 2015-01-30
=================
  * Update `array-includes`

1.0.4 / 2015-01-29
=================
  * Fix `npm run build` to browserify the package, so that dist/es7-shim\* has the auto-shim version.

1.0.3 / 2015-01-25
=================
  * Fix accidental `covert` dev dependency version change

1.0.2 / 2015-01-25
=================
  * Update `array-includes`: now uses `es-abstract` for ECMAScript spec internal abstract operations
  * Update dev dependencies: `browserify`, `tape`, `eslint`, `jscs`

1.0.1 / 2015-01-07
=================
  * Fix browserification

1.0.0 / 2015-01-06
=================
  * Initial release
