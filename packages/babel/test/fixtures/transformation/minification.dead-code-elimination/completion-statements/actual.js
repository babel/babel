for (var key in foo) {
  break;
  foo();
}

function bar() {
  yes();
  bar();
  return "wow";
  nomore();
}

bar();
