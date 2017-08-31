const els = {
  subComponent: () => <span>Sub Component</span>
};
class Component extends React.Component {
  render = () => <els.subComponent />
}
