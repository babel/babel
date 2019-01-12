
case ({ x: 1 }) {
  when { x } -> {
    expect(x).toBe(1);
  }
}

case ({ y: 1 }) {
 when { y } -> {
   const y = 3;
   expect(y).toBe(3);
  }
}

case ({ z: 1 }) {
  when { z } -> {
    expect(z).toBe(1);
    if ("window") {
      const z = "window";
      expect(z).toBe("window");
    }
    expect(z).toBe(1);
  }
}
