function skipWhile(cond) {
  if (!hasNext() || cond(current, last)) return;
  move();
  skipWhile(cond);
}

var skipWhile2 = function (cond) {
  if (!hasNext() || cond(current, last)) return;
  move();
  skipWhile2(cond);
};
