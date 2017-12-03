const {b} = (  (...args)  =>  ({b: args[1]}))(...[,1]);//destructuring / rest / spread

console.log(b === 1);

/*
Test note:
 ! this test should be in a first line  !
 ! completed test: do not edit it       !
*/
