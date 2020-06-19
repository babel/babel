const require = path => {
  switch(path) {
    case "assert":
      return window.chai.assert
    case "../babel":
      return window.Babel
  }
}
