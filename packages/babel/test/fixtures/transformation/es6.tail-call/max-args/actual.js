var count = (i = 10) => {
  if (!i) return;
  return count(i - 1);
};

function count2(i = 10) {
  if (!i) return;
  return count2(i - 1);
}
