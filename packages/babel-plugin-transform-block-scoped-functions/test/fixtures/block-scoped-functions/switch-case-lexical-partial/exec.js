switch (2) {
  case 1:
    let unused = 0;
  case 2:
    const y=1, x = y + 1, z = 100;
    let n = 0;
    function h() { n++; return y + n; }
    expect(h()).toBe(2);
    expect(h()).toBe(3);
    expect(x).toBe(2);
    expect(z).toBe(100);
}
