// Remove padding from a string.
function unpad(str) {
  const lines = str.split("\n");
  const m = lines[1] && lines[1].match(/^\s+/);
  if (!m) {
    return str;
  }
  const spaces = m[0].length;
  return lines.map(
    (line) => line.slice(spaces)
  ).join("\n").trim();
}

module.exports = unpad;
