/* globals global1:true,const_global2:false*/
/* global const_global3,global4:true*/
global1 = 123;// no error
const_global2 = 123;// error 'const_global2' is read-only
const_global3 = 123;// error 'const_global3' is read-only
global4 = 123;// no error

function test() {
    'use strict';
    /*globals f_global1:true,f_const_global2:false*/
    /*global f_const_global3,f_global4:true*/
    f_global1 = 555;// no error
    f_const_global2 = 55;// error 'f_const_global2' is read-only
    f_const_global3 = 555;// error 'f_const_global3' is read-only
    f_global4 = 555;// no error

    f_const_global5 = 555;// error using before declaration
    f_global6 = 555;// error using before declaration
    /*global f_const_global5,f_global6:true*/
    f_const_global5 = 666;// error 'f_const_global5' is read-only
    f_global6 = 666;// no error
}
f_global1 = 321;// ??? error undefined 'f_global1' -> jshint say int's fine
f_const_global2 = 321;// ??? error undefined 'f_const_global2' -> jshint say error read-only
f_const_global3 = 321;// ??? error undefined 'f_const_global3' -> jshint say error read-only
f_global4 = 321;// ??? error undefined 'f_global4' -> jshint say int's fine

test();

/*  global global5:true */
global5 = 'global 5';// error undefined 'global5'
//global global6:true
global6 = 'global 6';// error undefined 'global6'