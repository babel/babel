// Options: --forOf=false
// Error: :5:12: Unexpected token of

var s = [];
for (var i of yieldFor()) {
  s.push(i);
}
