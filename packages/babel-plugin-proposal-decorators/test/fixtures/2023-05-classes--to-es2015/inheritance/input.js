const dec1 = () => {};
const dec2 = () => {};
@dec1
class Bar {}

@dec2
class Foo extends Bar {}
