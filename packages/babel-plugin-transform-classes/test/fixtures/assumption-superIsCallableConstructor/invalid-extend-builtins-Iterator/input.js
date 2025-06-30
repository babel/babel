// Iterator can not be invoked with new, so this example does not
// satisfy the superIsCallableConstructor assumption, it will throw
// a runtime error
class RangeIterator extends Iterator {}
