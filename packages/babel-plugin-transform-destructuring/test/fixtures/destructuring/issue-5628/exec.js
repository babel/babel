(function () {
  let q;
  let w;
  let e;
  if (true) [q, w, e] = [1, 2, 3].map(()=>123);
  expect([q, w, e]).toEqual([123, 123, 123]);
})();
