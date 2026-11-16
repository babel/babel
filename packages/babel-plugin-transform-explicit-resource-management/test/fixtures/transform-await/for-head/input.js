for (await using x of y) {
  doSomethingWith(x);
}

for await (await using x of y) {
  doSomethingWith(x);
}

for await (using x of y) {
  doSomethingWith(x);
}
