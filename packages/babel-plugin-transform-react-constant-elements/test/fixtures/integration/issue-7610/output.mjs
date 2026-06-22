import Parent from './Parent';
import Child from './Child';
import { jsx as _jsx } from "react/jsx-runtime";
function MyComponent({
  closeFn
}) {
  var _Child;
  return /*#__PURE__*/_jsx(Parent, {
    render: () => _Child || (_Child = /*#__PURE__*/_jsx(Child, {
      closeFn: closeFn
    }))
  });
}
export default Parent;
