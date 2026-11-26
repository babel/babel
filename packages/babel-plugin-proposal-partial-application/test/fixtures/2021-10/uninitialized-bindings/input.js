var early = f~(x);
var x = 1;

const y = 1;
function hoisted() {
  return f~(y);
}
const later = () => f~(y, hoisted);

for (const i of []) {
  f~(i);
}

switch (0) {
  case 1:
    let w = 1;
  case 0:
    f~(w);
}
