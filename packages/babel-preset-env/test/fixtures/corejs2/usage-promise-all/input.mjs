var p = Promise.resolve(0);
Promise.all([p]).then(outcome => {
  alert("OK");
});
