var _span, _els$subComponent;
const els = {
  subComponent: () => _span || (_span = <span>Sub Component</span>)
};
class Component extends React.Component {
  constructor() {
    super(...arguments);
    this.render = () => _els$subComponent || (_els$subComponent = <els.subComponent />);
  }
}
