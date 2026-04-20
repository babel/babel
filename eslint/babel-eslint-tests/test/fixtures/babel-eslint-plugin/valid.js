class MyClass1 { accessor x = 2 }

const MyDecorator = (arg) => arg;

@MyDecorator(123) class MyClass2{}

let a = do { if (MyClass1) { new MyClass1(); } }
