var _div2;
import React from 'react';

// Regression test for https://github.com/babel/babel/issues/5552
class BugReport extends React.Component {
  constructor(...args) {
    super(...args);
    this.thisWontWork = ({
      color
    }) => {
      var _div;
      return data => {
        return _div || (_div = <div color={color}>does not reference data</div>);
      };
    };
    this.thisWorks = ({
      color
    }) => data => {
      return <div color={color}>{data}</div>;
    };
  }
  render() {
    return _div2 || (_div2 = <div />);
  }
}
