{
  await using x = obj;
  stmt;
  await using y = obj, z = obj;
  doSomethingWith(x, y);
}
