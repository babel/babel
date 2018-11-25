var _ref =
/*#__PURE__*/
<span>Sub Component</span>;

const els = {
  subComponent: () => _ref
};

var _ref2 =
/*#__PURE__*/
<els.subComponent />;

class Component extends React.Component {
  constructor(...args) {
    super(...args);

    this.render = () => _ref2;
  }

}
