exports.guessTabWidth = function(source) {
  var counts = []; // Sparse array.
  var lastIndent = 0;

  source.split("\n").forEach(function(line) {
    var indent = /^\s*/.exec(line)[0].length;
    var diff = Math.abs(indent - lastIndent);
    counts[diff] = ~~counts[diff] + 1;
    lastIndent = indent;
  });

  var maxCount = -1;
  var result = 2;

  for (var tabWidth = 1;
       tabWidth < counts.length;
       tabWidth += 1) {
    if (tabWidth in counts &&
        counts[tabWidth] > maxCount) {
      maxCount = counts[tabWidth];
      result = tabWidth;
    }
  }

  return result;
};
