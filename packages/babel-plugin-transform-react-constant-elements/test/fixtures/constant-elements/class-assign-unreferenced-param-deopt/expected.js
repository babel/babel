import React from 'react';

// Regression test for https://github.com/babel/babel/issues/5552

var _ref2 = <div />;

class BugReport extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.thisWontWork = ({ color }) => {
      var _ref = <div color={color}>does not reference data</div>;

      return data => {
        return _ref;
      };
    }, this.thisWorks = ({ color }) => data => {
      return <div color={color}>{data}</div>;
    }, _temp;
  }

  render() {
    return _ref2;
  }
}