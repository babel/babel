{
  /*#__PURE__*/React.createElement("div",
  /*i18n*/
  {
    id: 'hello'
  });
}
{
  /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Trans,
  /*i18n*/
  {
    a: 1
  }));
}
{
  /*#__PURE__*/React.createElement("div", {
    id: 'hello'
  } /* comments */);
}
{
  /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Trans, {
    a: 1
  } /* comments */));
}
{
  /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Trans /*test1 */, {
    a: "1" /**test2 */,
    b: "2" /**test3 */
  }));
}
{
  /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Trans,
  /*test1*/
  {
    a: 1,
    /**test2 */b: "2" /*test3 */
  }));
}
