function* test() {
  (throw new Error(function.sent));
}
