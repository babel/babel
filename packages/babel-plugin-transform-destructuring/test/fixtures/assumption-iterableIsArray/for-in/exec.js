var obj = { ab: 1, cd: 2 };
var log = [];
function print(message) {
  log.push(message);
}

for (var [name, value] in obj) {
  print("Name: " + name + ", Value: " + value);
}

expect(log).toEqual(["Name: a, Value: b", "Name: c, Value: d"]);
log.length = 0;
name = value = undefined;

for ([name, value] in obj) {
  print("Name: " + name + ", Value: " + value);
}

expect(log).toEqual(["Name: a, Value: b", "Name: c, Value: d"]);
expect(name).toBe("c");
expect(value).toBe("d");
