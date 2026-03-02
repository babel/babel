var _div;
function AComponent() {
  var _CComponent;
  const CComponent = () => _div || (_div = <div />);
  return <BComponent />;
  function BComponent() {
    return _CComponent || (_CComponent = <CComponent />);
  }
}
