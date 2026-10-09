async function fn() {
  await 0;
  {
    await using x = y;
    await 1;
  }
}
