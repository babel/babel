{
  stmt;
  using x = obj;
  stmt;
  using y = obj, z = obj;
  stmt;
  using w = obj;
  doSomethingWith(x, z);
}
