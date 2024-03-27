function w() {
  for (let key in someObj) {
    let outer = {}
    for (var i = 0; i < y; i++) {
      let x = () => outer;
    }
  }
}
