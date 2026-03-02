var O = {
  a: "a"
}
const a = "a";
for (const { [a]: _ } of [O]) { const a = "A"; }

var _;
for ({ [a]: _ } of [O]) { const a = "A"; }
