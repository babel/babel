/*#__PURE__*/
React.createElement("div", null, "wow");

/*#__PURE__*/
React.createElement("div", null, "wôw");

/*#__PURE__*/
React.createElement("div", null, "w & w");

/*#__PURE__*/
React.createElement("div", null, "w & w");

/*#__PURE__*/
React.createElement("div", null, "w \xA0 w");

/*#__PURE__*/
React.createElement("div", null, "this should not parse as unicode: \\u00a0");

/*#__PURE__*/
React.createElement("div", null, "this should parse as nbsp: \xA0 ");

/*#__PURE__*/
React.createElement("div", null, "this should parse as unicode: ", '\u00a0 ');

/*#__PURE__*/
React.createElement("div", null, "w < w");
