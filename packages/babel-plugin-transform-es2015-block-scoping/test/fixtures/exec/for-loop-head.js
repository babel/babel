assert.equal((function(){
  let a = 1;
  for (let a = 0; a < 8; a++) {}
  return a;
}()), 1);
