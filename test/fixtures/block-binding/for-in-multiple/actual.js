for (var i in arr) {
  let val = arr[i];
  console.log(val * 2);

  for (i in arr) {
    let x = arr[i];
    console.log(x * 2);
  }
}
