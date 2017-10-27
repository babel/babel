let {
  a: [b, ...arrayRest],
  c = function(...functionRest){},
  ...objectRest
} = {
  a: [1, 2, 3, 4],
  d: "oyez"
};
