var logged = [];
var console = {
  log(value) {
    logged.push(value);
  },
};

function somethingAdvanced({topLeft: {x: x1, y: y1} = {}, bottomRight: {x: x2, y: y2} = {}}, p2, p3){

}

function unpackObject({title: title, author: author}) {
  return title + " " + author;
}

console.log(unpackObject({title: "title", author: "author"}));

var unpackArray = function ([a, b, c], [x, y, z]) {
  return a+b+c;
};

console.log(unpackArray(["hello", ", ", "world"], [1, 2, 3]));

expect(logged).toEqual(["title author", "hello, world"]);

expect(somethingAdvanced.length).toBe(3);
expect(unpackObject.length).toBe(1);
expect(unpackArray.length).toBe(2);
expect(somethingAdvanced({})).toBeUndefined();
expect(() => somethingAdvanced()).toThrow(TypeError);
expect(() => unpackArray(["a", "b", "c"])).toThrow(TypeError);
