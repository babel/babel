// Error: :6:3: super is only allowed in methods
// Error: :9:15: super is only allowed in methods
// Error: :10:17: super is only allowed in methods

function f() {
  super.x;
}

var g = () => super.y;
var h = () => { super.z; }
