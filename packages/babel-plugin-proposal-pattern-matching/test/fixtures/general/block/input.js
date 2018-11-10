
case (input) {
  when { x } -> {
    console.log('object: ', x);
  }
  when { y } -> {
    const y = 3;
    console.log('object: ', y);
  }
  when { z } -> {
    consle.log(z);
    if (window) {
      const z = "window";
      console.log(z);
    }
  }
}
