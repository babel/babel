for (({ a: obj.x = 1 } = o); ; ) break;
while (({ b: obj.y = 2 } = o)) break;
try {
  throw o;
} catch (e) {
  ({ c: obj.z = 3 } = e);
}
