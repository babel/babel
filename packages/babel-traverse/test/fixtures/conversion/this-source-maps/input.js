function fn() {
  var inner = () => {
    console.log(this);
  };
}
