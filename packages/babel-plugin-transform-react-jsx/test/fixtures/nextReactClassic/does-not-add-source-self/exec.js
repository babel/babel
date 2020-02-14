var actual = transform(
  `/** @jsxRuntime classic */
   var x = (
    <>
    <div>
        <div key="1" />
        <div key="2" meow="wolf" />
        <div key="3" />
        <div {...props} key="4" />
    </div>
    </>
  );`,
  Object.assign({}, opts, { filename: '/fake/path/mock.js' })
).code;

var expected = 
`var _jsxFileName = "/fake/path/mock.js";

/** @jsxRuntime classic */
var x = React.createElement(React.Fragment, null, React.createElement("div", null, React.createElement("div", {
  key: "1"
}), React.createElement("div", {
  key: "2",
  meow: "wolf"
}), React.createElement("div", {
  key: "3"
}), React.createElement("div", { ...props,
  key: "4"
})));`;

expect(actual).toBe(expected);
