try {
    match(1) {
      2: "3"
    }
} catch (e) {
  assert.equal(e.toString(), "Error: No patterns are matched");
}
