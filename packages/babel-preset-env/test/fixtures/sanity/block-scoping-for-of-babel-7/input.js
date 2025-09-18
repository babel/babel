// https://github.com/babel/babel/issues/7557
for (let [a] of c) {
  a = 1;
  () => a;
}
