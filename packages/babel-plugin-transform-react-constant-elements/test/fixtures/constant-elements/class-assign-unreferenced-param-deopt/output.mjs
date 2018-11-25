import React from 'react'; // Regression test for https://github.com/babel/babel/issues/5552

var _ref =
/*#__PURE__*/
<div />;

class BugReport extends React.Component {
  constructor(...args) {
    super(...args);

    this.thisWontWork = ({
      color
    }) => data => {
      return <div color={color}>does not reference data</div>;
    };

    this.thisWorks = ({
      color
    }) => data => {
      return <div color={color}>{data}</div>;
    };
  }

  render() {
    return _ref;
  }

}
