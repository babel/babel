export class Component3a extends React.Component {
  render() {
    return <div></div>;
  }
}

Component3a.displayName = "Component3a";
export default class Component3b extends React.Component {
  render() {
    return <div></div>;
  }
}

Component3b.displayName = "Component3b";
export class Component3c extends Component {
  render() {
    return <div></div>;
  }
}

Component3c.displayName = "Component3c";
class Component3d extends Component {
  static get = () => {
    return <div />;
  };
  render() {
    return <div />;
  }
}
Component3d.displayName = "Component3d";
