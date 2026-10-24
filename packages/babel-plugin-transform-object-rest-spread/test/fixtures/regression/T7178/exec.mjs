import props from "./props.js";

var logged = [];
var console = {
  log(value) {
    logged.push(value);
  },
};

console.log(props);

expect(() => {
  (function(){
    const { ...props } = this.props;

    console.log(props);
  })();
}).toThrow(TypeError);

var innerProps = { inner: "props", other: 1 };

(function(){
  const { ...props } = this.props;

  console.log(props);
}).call({ props: innerProps });

expect(logged).toEqual([{ outer: "props" }, { inner: "props", other: 1 }]);
expect(logged[1]).not.toBe(innerProps);
