try {
  throw 0;
} catch (renamed) {
  console.log("it failed, but this code executes");
}
