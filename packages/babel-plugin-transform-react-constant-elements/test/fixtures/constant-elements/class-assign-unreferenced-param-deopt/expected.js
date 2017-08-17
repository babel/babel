import React from 'react'; // Regression test for https://github.com/babel/babel/issues/5552

var _ref = <div />;

class BugReport extends React.Component {
  constructor() {
    var _temp;

    return _temp = super(...arguments), this.thisWontWork = ({
      color
    }) => data => {
      return <div color={color}>does not reference data</div>;
    }, this.thisWorks = ({
      color
    }) => data => {
      return <div color={color}>{data}</div>;
    }, _temp;
  }

  render() {
    return _ref;
  }

}
