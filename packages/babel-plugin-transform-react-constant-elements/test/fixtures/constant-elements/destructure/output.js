class AnchorLink extends Component {
  render() {
    const _this$props = this.props,
          isExternal = _this$props.isExternal,
          children = _this$props.children;

    if (isExternal) {
      return <a>{children}</a>;
    }

    return <Link>{children}</Link>;
  }

}
