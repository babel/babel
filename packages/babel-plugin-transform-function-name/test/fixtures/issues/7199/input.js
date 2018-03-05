const x = {
  [null]: function () {},
  [/regex/gi]: function () {},
  [`y`]: function () {},
  [`abc${y}def`]: function () {},
  [0]: function () {},
  [false]: function () {},
};
