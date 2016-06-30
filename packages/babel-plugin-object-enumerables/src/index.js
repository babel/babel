const keysSource = "((o) => { var r = []; for (var k in o) { r.push(k) } return r; })";
const valuesSource = "((o) => { var r = []; for (var k in o) { r.push(o[k]) } return r; })";
const entriesSource = "((o) => { var r = []; for (var k in o) { r.push([k, o[k]]) } return r; })";

export default function() {
  return {
    visitor: {
      CallExpression: function (path) {
        if (path.get("callee").matchesPattern("Object.enumerableKeys")) {
          path.replaceWithSourceString(keysSource);
        } else if (path.get("callee").matchesPattern("Object.enumerableValues")) {
          path.replaceWithSourceString(valuesSource);
        } else if (path.get("callee").matchesPattern("Object.enumerableEntries")) {
          path.replaceWithSourceString(entriesSource);
        }
      }
    }
  };
}
