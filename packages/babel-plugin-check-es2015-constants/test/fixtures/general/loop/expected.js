throw new Error("\"i\" is read-only");

for (var i = 0; i < 3; i = i + 1) {
  console.log(i);
}