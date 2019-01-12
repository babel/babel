
const log = [];
case (1) {
  when x -> {
    case (2) {
      when x -> {
        log.push('a', x);
      }
    }
    log.push('b', x);
  }
}
expect(log).toEqual(['a', 2, 'b', 1]);

log.splice(0);
case (1) {
  when null -> {
    case (2) {
      when x -> {
        log.push('a', x);
      }
    }
    log.push('b', x);
  }
  when x -> log.push('c', x);
}
// TODO known failure
// expect(log).toEqual(['c', 1]);
