expect(/.(?<code>\p{ASCII})/su.exec("\nA").groups).toEqual({
  code: "A"
});
