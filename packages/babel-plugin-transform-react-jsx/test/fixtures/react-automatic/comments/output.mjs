import { jsx as _jsx } from "react/jsx-runtime";
{
  /*#__PURE__*/_jsx("div",
  /*i18n*/
  {
    id: 'hello'
  });
}
{
  /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsx(Trans,
    /*i18n*/
    {
      a: 1
    })
  });
}
{
  /*#__PURE__*/_jsx("div", {
    id: 'hello'
  } /* comments */);
}
{
  /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsx(Trans, {
      a: 1
    } /* comments */)
  });
}
{
  /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsx(Trans /*test1 */, {
      a: "1" /**test2 */,
      b: "2" /**test3 */
    })
  });
}
{
  /*#__PURE__*/_jsx("div", {
    children: /*#__PURE__*/_jsx(Trans,
    /*test1*/
    {
      a: 1,
      /**test2 */b: "2" /*test3 */
    })
  });
}
