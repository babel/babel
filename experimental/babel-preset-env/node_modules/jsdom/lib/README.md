# Note: this codebase is in a transitional state

We're slowly moving from a historical model based on layered "levels" of specs, to the [living standard model](https://wiki.whatwg.org/wiki/FAQ#What_does_.22Living_Standard.22_mean.3F) actually implemented by browsers. As such, the code is kind of a mess.

**Summary**: new features go in `lib/jsdom/living` and follow the code style there; modifications to existing features will require some spelunking to find out what to modify in-place.

---

A lot of the main implementation is in `lib/jsdom/level1` and `lib/jsdom/level2`. (That includes things that didn't appear in the original DOM Level 1 and Level 2 specs, just because the code was located there and we had to patch it.) We're trying to avoid adding new code there, but patching old code is often still required.

New features generally go in the `lib/jsdom/living` folder, in nice small files, with a clear coding style enforced by ESLint and JSCS.

We're planning to fix this whole situation with a multi-stage process:

- First, consolidate any leftovers in `lib/jsdom/browser` and `lib/jsdom/level3`, as well as the more substantial body of code in `lib/jsdom/level2`, into `lib/jsdom/level1`. This will contain the "historical" portion of the jsdom codebase.
- Then, embark on a major cleanup and refactoring effort, splitting out small pieces from `lib/jsdom/level1` and into `lib/jsdom/living`, cleaning up the code style and spec compliance as we go.
- Finally, collapse the silly directory hierarchy into something less nested.
