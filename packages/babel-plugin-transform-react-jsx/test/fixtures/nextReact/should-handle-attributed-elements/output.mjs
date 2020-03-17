import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var HelloMessage = React.createClass({
  displayName: "HelloMessage",
  render: function () {
    return _jsxs("div", {
      children: ["Hello ", this.props.name]
    });
  }
});
React.render(_jsx(HelloMessage, {
  name: _jsx("span", {
    children: "Sebastian"
  })
}), mountNode);
