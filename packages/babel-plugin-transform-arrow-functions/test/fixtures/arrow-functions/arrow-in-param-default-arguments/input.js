function count(first, read = () => arguments.length) {
  return read();
}
count(1);
