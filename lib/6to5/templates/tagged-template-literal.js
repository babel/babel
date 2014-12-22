(function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: raw } }));
});

