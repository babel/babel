// Options: --generator-comprehension --free-variable-checker
// Error: :5:1: notDefined is not defined

var iter = (for (notDefined of [0]) notDefined);
notDefined;
