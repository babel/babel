let result = (function(...r){const {b} = (  (...args)  =>  ({b: args[1]}))(...r);//destructuring / rest / spread
	return b;
})(...[1, 2, 3]);

console.log(result === 2);

/*
 Test note:
 ! this test should be in a first line  !
 ! completed test: do not edit it       !
*/
