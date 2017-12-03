/*globals global1:true,const_global2:false*/
/* global const_global3,global4:true*/
global1 = 123;// no error
global4 = 123;// no error

console.log(global1 == 123, typeof const_global2 == 'undefined', typeof const_global3 == 'undefined', global4 == 123);

function test() {
    'use strict';
    /* globals f_global1:true,f_const_global2:false*/
    /*global f_const_global3,f_global4:true*/
    f_global1 = 555;// no error
    f_global4 = 555;// no error
	console.log(f_global1 == 555, typeof f_const_global2 == 'undefined', typeof f_const_global3 == 'undefined', f_global4 == 555);

    /*global f_const_global5,f_global6:true*/
    f_global6 = 666;// no error
	console.log(f_global6 == 666, typeof f_const_global5 == 'undefined');
}

test();
