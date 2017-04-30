// Exported stateless componenet
export function Component1a(value) {
  return <div>{value}</div>;
}

Component1a.displayName = "Component1a";
// Stateless componenet
function Component1b(value) {
  return <div>{value}</div>;
}

Component1b.displayName = "Component1b";
// Stateless componenet used in a variable declaration
var Component1c = function (value) {
  return <div>{value}</div>;
};

Component1c.displayName = "Component1c";
// Exported named stateless component used in variable declaration
export var Component1d = function (value) {
  return <div>{value}</div>;
};

Component1d.displayName = "Component1d";
// Stateless componenet used in an assignment
var Component1e;
Component1e = function (value) {
  return <div>{value}</div>;
};

Component1e.displayName = "Component1e";
// Exported default stateless *named* component used in variable declaration
export default function Component1f(value) {
  return <div>{value}</div>;
}
Component1f.displayName = "Component1f";