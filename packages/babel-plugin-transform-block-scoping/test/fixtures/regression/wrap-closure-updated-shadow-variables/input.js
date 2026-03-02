// https://github.com/babel/babel/issues/15397

var i;
for (let i = 0; i < 1; ) {
  i++
  () => i;
}
