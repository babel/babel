var _ref = <span>Sub Component</span>;

const els = {
  subComponent: () => _ref
};

var _ref2 = <els.subComponent />;

class Component extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.render = () => _ref2, _temp;
  }

}
