function* g() {
  return target.method((events.push('argument'), yield 1));
}
