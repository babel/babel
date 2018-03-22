let x = 1;
{
  let x = 2;
  expect(x).toBe(2);
  {
    let x = 3;
    expect(x).toBe(3);

    x++;
    expect(x).toBe(4);
  }
}
expect(x).toBe(1);
