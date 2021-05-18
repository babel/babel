class Test extends React.Component {
  constructor() {
    const fn = () => <this.A />;
    fn();
    super();
  }

  renderA = () => <this.A prop={this.b} />;

  renderB = () => {
    const { A } = this;
    return <A />;
  };

  renderC() {
    return <this.A />;
  }
}
