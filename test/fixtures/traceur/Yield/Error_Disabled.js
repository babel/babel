// Options: --generators=false
// Error: :4:9: Unexpected token *

function* range(start, end) {
  for (var i = start; i < end; i++) {
    yield i;
  }
}
