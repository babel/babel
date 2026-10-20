let fs = [];
for (let k = 0; k < 2; k++) {
  for (let i = k, f = () => i; ; ) {
    fs.push(f);
    break;
  }
}
