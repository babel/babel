class AnchorLink extends Component {
  render() {
    var _props = this.props;
    const isExternal = _props.isExternal,
          children = _props.children;

    if (isExternal) {
      return <a>{children}</a>;
    }

    return <Link>{children}</Link>;
  }
}