switch (0) {
  case a ? (x, y) : (z => w):
  case a ? <T>(x, y) : (z => w):
  case a ? () => ((x, y)) : z => w:
  case a ? b ? c : ((x, y)) : z => w:
  case a ? ((/* c */ x)) : z => w:
  case a ? f(x) : z => w:
}
a ? (x, y) : (z => w);
a ? x : (z => w);
