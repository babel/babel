export class Component3a extends React.Component {
  render() {
    return <div></div>;
  }
}

export default class Component3b extends React.Component {
  render() {
    return <div></div>;
  }
}

export class Component3c extends Component {
  render() {
    return <div></div>;
  }
}

class Component3d extends Component {
  static get = () => {
    return <div />;
  }
  render() {
    return <div />;
  }
}
