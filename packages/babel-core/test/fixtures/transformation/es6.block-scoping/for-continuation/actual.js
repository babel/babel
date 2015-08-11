for (let i = 0; i < 2; i++) {
  () => { i };
  console.log(i);
  i += 1;
}
