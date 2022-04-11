// import parse from "@babel/parser";
expect(() => {
    const source = `
        class Foo {
            equals(foo){
                class.h\x61sInstance(foo)
            }
        }
    `
    // parse.parse(source)
    
})

// expect(() => {
//     class Foo {
//         equals(foo){
//             class.h\u61sInstance(foo)
//         }
//     }
// }).toThrow(/unexpect token/);
  

// expect(() => {
//     class Foo {
//         equals(foo){
//             class.hasInstance();
//         }
//     }
// }).toThrow(/unexpect token/);

// expect(() => {
//     class Foo {
//         equals(foo){
//             class.hasInstance(foo, bar);
//         }
//     }
// }).toThrow(/unexpect token/);

// expect(() => {
//     class Foo {
//         equals(foo){
//             class.hasInstance(...foo);
//         }
//     }
// }).toThrow(/unexpect token/);

// expect(() => {
//     class Foo {
//         equals(foo){
//             class.hasInstance(foo, ...bar);
//         }
//     }
// }).toThrow(/unexpect token/);