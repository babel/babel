var p = Promise.resolve(0);
Promise.race([p]).then(outcome => {
  alert("OK");
});
