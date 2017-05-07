var _temp;

if (((_temp = a) != null ? _temp.b : undefined) != undefined) {
  delete a.b;
}

if (((_temp = ((_temp = a) != null ? _temp.b : undefined).c) != null ? _temp.d : undefined) != undefined) {
  delete ((_temp = a.b) != null ? _temp.c : undefined).d;
}