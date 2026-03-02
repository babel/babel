maybeCallLater(function f() {
  x++;
  ++x;
  x.p++;
  ++x.p;
});

x++;
++x;
x.p++;
++x.p;

let x;
