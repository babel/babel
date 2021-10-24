match (name) {
  when (/abc/) { }
  when ("foo") { }
  when (100) { }
  when (100n) { }
  when (true) { }
  when (false) { }
  when (undefined) { }
  when (Infinity) { }
  when (null) { }
}