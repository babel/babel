try {} catch (err) {}

try {} catch {}

try {
  bar;
} catch (err) {}

try {
  bar;
} catch {}

try {
  bar;
} catch (err) {
  foo();
}

try {
  bar;
} catch {
  foo();
}

try {
  bar;
} catch (err) {
  foo();
} finally {
  yay();
}

try {
  bar;
} catch {
  foo();
} finally {
  yay();
}

try {
  bar;
} catch (err) {
  foo();
} finally {}

try {
  bar;
} catch {
  foo();
} finally {}