const x = (n) => do {
  switch (n) {
    case 0: case 6: {
      "weekend 🚵";
      break;
    }
    default: "weekday 🚴"
  }
}

expect(x(0)).toBe('weekend 🚵')
expect(x(1)).toBe('weekday 🚴')
expect(x(6)).toBe('weekend 🚵')