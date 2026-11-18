function f() {
  (throw a);
  (throw a), b;
  (throw a)();
  x = throw a;
  () => throw a;
}