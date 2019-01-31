Promise.resolve().then(it => {
  setTimeout(foo, 1, 2);
  setInterval(foo, 1, 2);
  setImmediate(foo, 1, 2);
});
