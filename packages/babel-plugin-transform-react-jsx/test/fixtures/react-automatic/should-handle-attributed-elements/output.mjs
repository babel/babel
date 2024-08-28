import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
var HelloMessage = React.createClass({
  displayName: "HelloMessage",
  render: function () {
    return /*#__PURE__*/_jsxs("div", {
      children: ["Hello ", this.props.name]
    });
  }
});
React.render(/*#__PURE__*/_jsx(HelloMessage, {
  name: /*#__PURE__*/_jsx("span", {
    children: "Sebastian"
  })
}), mountNode);
