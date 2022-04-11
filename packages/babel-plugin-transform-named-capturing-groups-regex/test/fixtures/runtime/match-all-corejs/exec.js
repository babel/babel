require('core-js/features/string/match-all.js');

const string = "Favorite GitHub repos: tc39/ecma262 v8/v8.dev";
const regex = /\b(?<owner>[a-z0-9]+)\/(?<repo>[a-z0-9\.]+)\b/g;

const matches = string.matchAll(regex);

expect(matches.next().value.groups).toEqual({
  owner: "tc39",
  repo: "ecma262",
});

expect(matches.next().value.groups).toEqual({
  owner: "v8",
  repo: "v8.dev",
});
