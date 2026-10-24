var c2 = { a2: "a2", x: 1, y: 2 };
var a2, b2;
var logs = [];
var console = { log: (...args) => logs.push(args) };
var React = {
  Component: class {
    constructor(props) {
      this.props = props;
    }
  },
  createElement: (type, props) => ({ type, props }),
};
var calls = [];
function call(arg) {
  calls.push(arg);
}

// should not remove when destructuring into existing bindings
({ a2, ...b2 } = c2);

class Comp extends React.Component {
  render() {
    const {
      excluded,
      excluded2: excludedRenamed,
      used,
      used2: usedRenamed,
      ...props
    } = this.props;

    console.log(used, usedRenamed);

    return React.createElement("input", props);
  }
}

function smth({ unused, ...rest }) {
  call(rest);
}

expect(a2).toBe("a2");
expect(b2).toEqual({ x: 1, y: 2 });

var element = new Comp({
  excluded: 1,
  excluded2: 2,
  used: "used",
  used2: "used2",
  value: "value",
  name: "name",
}).render();
expect(element).toEqual({ type: "input", props: { value: "value", name: "name" } });
expect(logs).toEqual([["used", "used2"]]);

smth({ unused: 1, kept: 2 });
expect(calls).toEqual([{ kept: 2 }]);
expect(() => smth(null)).toThrow(TypeError);
