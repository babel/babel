var _ref = <span>Sub Component</span>;

class Component extends React.Component {
  constructor(...args) {
    super(...args);

    this.subComponent = () => _ref;

    var _ref2 = <this.subComponent />;

    this.render = () => _ref2;
  }

}
