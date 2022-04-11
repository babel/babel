try {
  throw 0;
} catch (err) {
  console.log(err, "it failed, but this code executes");
} finally {
  console.log("this code also executes");
}
