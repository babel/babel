try {
  throw 0;
} catch ([
  message
]) {
  console.log("it failed, but this code executes");
}
