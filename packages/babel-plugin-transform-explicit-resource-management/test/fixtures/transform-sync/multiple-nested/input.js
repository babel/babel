{
  using x = obj;
  {
    using y = call(() => {
      using z = obj;
      return z;
    });
    stmt;
  }
  stmt;
}