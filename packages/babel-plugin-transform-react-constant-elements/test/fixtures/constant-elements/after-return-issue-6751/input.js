function AComponent () {
  const CComponent = () => <div/>
  return <BComponent/>

  function BComponent () {
    return <CComponent/>
  }
}
