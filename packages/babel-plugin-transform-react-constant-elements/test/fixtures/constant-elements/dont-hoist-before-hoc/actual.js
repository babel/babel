import React from "react";

const HOC = component => component;

const Parent = ({}) => (
  <div className="parent">
    <Child/>
  </div>
);

export default Parent;

let Child = () => (
  <div className="child">
    ChildTextContent
  </div>
);
Child = HOC(Child);
