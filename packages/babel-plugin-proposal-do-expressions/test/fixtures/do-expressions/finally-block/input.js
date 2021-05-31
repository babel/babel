const x = do {
  try {
    a();
  } catch (e) {
    b();
  } finally {
    c();
  }
}
