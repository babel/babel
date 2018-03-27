function r(strings) {
  expect(strings.raw[0]).toBe('\\n');
  return strings.raw.join('');
}

expect(r `\n`).toBe('\\n');
