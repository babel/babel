"use strict";var SLICE$0 = Array.prototype.slice;

var a = 1;
{
	var a$0 = 2;//
}

{
	var test = {
		test: function(){return 1}
	}
	console.log(test.test() === 1)

	{
		var test$0 = {
			test: function(a){var a = a.a;var rest = SLICE$0.call(arguments, 1);return a+rest[0]}
		}
		console.log(test$0.test({a: 1}, 2, 999) === 3)
	}

	(function() {var this$0 = this;

		var test = {
			test: function(){return 1+this$0.test}
		}
		console.log(test.test() === 101)

		{
			var test$1 = {
				test: function(a){var a = a.a;var rest = SLICE$0.call(arguments, 1);return a+rest[0]+this$0.test}
			}
			console.log(test$1.test({a: 1}, 2, 999) === 103)
		}

	}).call({test: 100})
}

{
	var test$2 = {
		test: function(){return 2} 
	}
	console.log(test$2.test() === 2)

	{
		var test$3 = {
			test: function(a){var a = a.a;var rest = SLICE$0.call(arguments, 1);return a+rest[0]} 
		}
		console.log(test$3.test({a: 2}, 2, 999) === 4)
	}

	(function() {var this$0 = this;

		var test = {
			test: function(){return 2+this$0.test} 
		}
		console.log(test.test() === 102)

		{
			var test$4 = {
				test: function(a){var a = a.a;var rest = SLICE$0.call(arguments, 1);return a+rest[0]+this$0.test} 
			}
			console.log(test$4.test({a: 2}, 2, 999) === 104)
		}

	}).call({test: 100})
}

{
	var test$5 = {
		test: function(){return (1, 3)}
	}
	console.log(test$5.test() === 3)

	{
		var test$6 = {
			test: function(a){var a = a.a;var rest = SLICE$0.call(arguments, 1);return (1, a+rest[0])}
		}
		console.log(test$6.test({a: 3}, 2, 999) === 5)
	}

	(function() {var this$0 = this;

		var test = {
			test: function(){return (1, 3+this$0.test)}
		}
		console.log(test.test() === 103)

		{
			var test$7 = {
				test: function(a){var a = a.a;var rest = SLICE$0.call(arguments, 1);return (1, a+rest[0]+this$0.test)}
			}
			console.log(test$7.test({a: 3}, 2, 999) === 105)
		}

	}).call({test: 100})
}

{
	var test$8 = {
		test: function(){return [3, 4]} 
	}
	console.log(test$8.test().join("|") === [3, 4].join("|"))

	{
		var test$9 = {
			test: function(a){var a = a.a;var rest = SLICE$0.call(arguments, 1);return [a, rest[0]]} 
		}
		console.log(test$9.test({a: 4}, 2, 999).join("|") === [4, 2].join("|"))
	}

	(function() {var this$0 = this;

		var test = {
			test: function(){return [3, 4, this$0.test]} 
		}
		console.log(test.test().join("|") === [3, 4, 100].join("|"))

		{
			var test$10 = {
				test: function(a){var a = a.a;var rest = SLICE$0.call(arguments, 1);return [a, rest[0], this$0.test]} 
			}
			console.log(test$10.test({a: 4}, 2, 999).join("|") === [4, 2, 100].join("|"))
		}

	}).call({test: 100})
}

{
	var test$11 = {
		test: function()
			{return 5}
		 
	}
	console.log(test$11.test() === 5)

	{
		var test$12 = {
			test: function(a)
				{var a = a.a;var rest = SLICE$0.call(arguments, 1);return a+rest[0]}
			 
		}
		console.log(test$12.test({a: 5}, 2, 999) === 7)
	}

	(function() {var this$0 = this;

		var test = {
			test: function()
				{return 5 + this$0.test}
			 
		}
		console.log(test.test() === 105)

		{
			var test$13 = {
				test: function(a)
					{var a = a.a;var rest = SLICE$0.call(arguments, 1);return a+rest[0]+this$0.test}
				 
			}
			console.log(test$13.test({a: 5}, 2, 999) === 107)
		}

	}).call({test: 100})
}

{
	var test$14 = {
		test: function()
			{return [5, 6]}
		 
	}
	console.log(test$14.test().join("|") === [5, 6].join("|"))

	{
		var test$15 = {
			test: function(a)
				{var a = a.a;var rest = SLICE$0.call(arguments, 1);return [a, rest[0]]}
			 
		}
		console.log(test$15.test({a: 6}, 2, 999).join("|") === [6, 2].join("|"))
	}

	(function() {var this$0 = this;

		var test = {
			test: function()
				{return [5, 6, this$0.test]}
			 
		}
		console.log(test.test().join("|") === [5, 6, 100].join("|"))

		{
			var test$16 = {
				test: function(a)
					{var a = a.a;var rest = SLICE$0.call(arguments, 1);return [a, rest[0], this$0.test]}
				 
			}
			console.log(test$16.test({a: 6}, 2, 999).join("|") === [6, 2, 100].join("|"))
		}

	}).call({test: 100})
}

{
	var test$17 = {
		test: /*com1*/function(/*com2*/)/*com3-1*//*com3-2*///com4
			/*com5*/{return 7}//com6
		/*com7*/ //com8
	}
	console.log(test$17.test() === 7)

	{
		var test$18 = {
			test: /*com1*/function(/*com2*/a/*com3-3*/)/*com3-4*//*com3-5*///com4
				/*com5*/{var a = a.a;var rest = SLICE$0.call(arguments, 1);return a+rest[0]}//com6
			/*com7*/ //com8
		}
		console.log(test$18.test({a: 7}, 2, 999) === 9)
	}

	(function() {var this$0 = this;

		var test = {
			test: /*com1*/function(/*com2*/)/*com3-1*//*com3-2*///com4
				/*com5*/{return 7+this$0.test}//com6
			/*com7*/ //com8
		}
		console.log(test.test() === 107)

		{
			var test$19 = {
				test: /*com1*/function(/*com2*/a/*com3-3*/)/*com3-4*//*com3-5*///com4
					/*com5*/{var a = a.a;var rest = SLICE$0.call(arguments, 1);return a+rest[0]+this$0.test}//com6
				/*com7*/ //com8
			}
			console.log(test$19.test({a: 7}, 2, 999) === 109)
		}

	}).call({test: 100})
}

{
	var test$20 = {
		test: /*com1*/function(/*com2*/)/*com3-1*//*com3-2*///com4
			/*com5*/{return [7, 8]}//com6
		/*com7*/ //com8
	}
	console.log(test$20.test().join("|") === [7, 8].join("|"))

	{
		var test$21 = {
			test: /*com1*/function(/*com2*/a/*com3-3*/)/*com3-4*//*com3-5*///com4
				/*com5*/{var a = a.a;var rest = SLICE$0.call(arguments, 1);return [a, rest[0]]}//com6
			/*com7*/ //com8
		}
		console.log(test$21.test({a: 8}, 2, 999).join("|") === [8, 2].join("|"))
	}

	(function() {var this$0 = this;

		var test = {
			test: /*com1*/function(/*com2*/)/*com3-1*//*com3-2*///com4
				/*com5*/{return [7, 8, this$0.test]}//com6
			/*com7*/ //com8
		}
		console.log(test.test().join("|") === [7, 8, 100].join("|"))

		{
			var test$22 = {
				test: /*com1*/function(/*com2*/a/*com3-3*/)/*com3-4*//*com3-5*///com4
					/*com5*/{var a = a.a;var rest = SLICE$0.call(arguments, 1);return [a, rest[0], this$0.test]}//com6
				/*com7*/ //com8
			}
			console.log(test$22.test({a: 8}, 2, 999).join("|") === [8, 2, 100].join("|"))
		}

	}).call({test: 100})
}

{
	var test$23 = {
		test: /*com1*/function(/*com2*/)/*com3-1*//*com3-2*/{return (1,//com4
			/*com5*/9//com6
		/*com7*/)}//com8
	}
	console.log(test$23.test() === 9)

	{
		var test$24 = {
			test: /*com1*/function(/*com2*/a/*com3-3*/)/*com3-4*//*com3-5*/{var a = a.a;var rest = SLICE$0.call(arguments, 1);return (1,//com4
				/*com5*/a+rest[0]//com6
			/*com7*/)}//com8
		}
		console.log(test$24.test({a: 9}, 2, 999) === 11)
	}

	(function() {var this$0 = this;

		var test = {
			test: /*com1*/function(/*com2*/)/*com3-1*//*com3-2*/{return (1,//com4
				/*com5*/9+this$0.test//com6
			/*com7*/)}//com8
		}
		console.log(test.test() === 109)

		{
			var test$25 = {
				test: /*com1*/function(/*com2*/a/*com3-3*/)/*com3-4*//*com3-5*/{var a = a.a;var rest = SLICE$0.call(arguments, 1);return (1,//com4
					/*com5*/a+rest[0]+this$0.test//com6
				/*com7*/)}//com8
			}
			console.log(test$25.test({a: 9}, 2, 999) === 111)
		}

	}).call({test: 100})
}
