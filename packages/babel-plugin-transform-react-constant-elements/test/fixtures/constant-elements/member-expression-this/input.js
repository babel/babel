class Component extends React.Component {
  subComponent = () => <span>Sub Component</span>

  render = () => <this.subComponent />
}
