class Database {
  transaction(
    // If the type annotation here contains the *name of the method*
    // then it changes how the method is compiled. Rename `transaction`
    // below and see how the output changes.
    callback: (transaction: Transaction) => unknown,
  ) {
    return this.table.transaction(
      (x) => callback(new DaoTransaction(x)),
    );
  }
}
