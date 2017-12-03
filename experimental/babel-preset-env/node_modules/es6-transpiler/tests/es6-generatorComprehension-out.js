var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};var S_STAG$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["toStringTag"]||'@@toStringTag';var Generator$0 = Function["__Generator__"];if(!Generator$0){Function["__Generator__"]=Generator$0=function Generator(){if(!(this instanceof Generator$0))throw new TypeError('incompatible'+this);this["__next__"]=arguments[0];this["__throw__"]=arguments[1];};Generator$0.prototype={constructor:Generator$0,"next":function(val){if(!(this instanceof Generator$0))throw new TypeError('next method called on incompatible '+this);if(this["__next__"]){try {return this["__next__"](val);}catch(e){if(this["__throw__"])return this["__throw__"](e);else throw e;}}else return {"value":void 0,"done":true};},"throw":function(e){if(!(this instanceof Generator$0))throw new TypeError('throw method called on incompatible '+this);if(this&&this["__throw__"])return this["__throw__"](e);else throw e},"toString":function(){return '[object Generator]'}};if(S_MARK$0)S_MARK$0(Generator$0.prototype);Generator$0.prototype[S_STAG$0]='Generator';Generator$0.prototype[S_ITER$0]=function(){return this};if(S_MARK$0)S_MARK$0(void 0);};function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;var f;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){if(S_MARK$0)S_MARK$0(void 0);return f.call(v);}if(S_MARK$0)S_MARK$0(void 0);if((v+'')==='[object Generator]')return v;}throw new Error(v+' is not iterable')};
var isGenerator = function(a) {
	return a + '' === '[object Generator]' && typeof a.next === 'function' && typeof a.throw === 'function';
};

{// result object
	var arr1 = []
	var gen = (function(){var $D$0;var $D$1;var $D$2;var a;var done$0=false;var init$0=false;return new Generator$0(function next$0(throw_error$0,throw$0){if(throw$0===true){done$0=true;}if(done$0===false){if(init$0===false){$D$0 = GET_ITER$0(arr1);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? arr1.length : void 0);init$0=true;}if($D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"]){a = ($D$2 ? arr1[$D$0++] : $D$1["value"]);;return {"value":a,"done":false};}else{;$D$0 = $D$1 = $D$2 = void 0;a=void 0;done$0=true;}}if(done$0===true){if(this&&this["__next__"]===next$0){delete this["__next__"];delete this["__throw__"];};};if(throw$0===true){throw throw_error$0;};return {"value":void 0,"done":true};},function(err){if(this&&this["__next__"]){return this["__next__"](err,true);}else {throw err}})})()

	var firstValue = gen.next();

	console.log(typeof firstValue === 'object' && firstValue && 'value' in firstValue && typeof firstValue.done === 'boolean');
}

{// simple
	var arr1$0 = [1, 2, 3]
	var gen$0 = (function(){var $D$3;var $D$4;var $D$5;var a;var done$0=false;var init$0=false;return new Generator$0(function next$0(throw_error$0,throw$0){if(throw$0===true){done$0=true;}if(done$0===false){if(init$0===false){$D$3 = GET_ITER$0(arr1$0);$D$5 = $D$3 === 0;$D$4 = ($D$5 ? arr1$0.length : void 0);init$0=true;}if($D$5 ? ($D$3 < $D$4) : !($D$4 = $D$3["next"]())["done"]){a = ($D$5 ? arr1$0[$D$3++] : $D$4["value"]);;return {"value":a,"done":false};}else{;$D$3 = $D$4 = $D$5 = void 0;a=void 0;done$0=true;}}if(done$0===true){if(this&&this["__next__"]===next$0){delete this["__next__"];delete this["__throw__"];};};if(throw$0===true){throw throw_error$0;};return {"value":void 0,"done":true};},function(err){if(this&&this["__next__"]){return this["__next__"](err,true);}else {throw err}})})()

	var out = ITER$0(gen$0 )
//	let out2 = [];
//	for( let a of gen ) out2.push(a)

	var result = arr1$0;
		
//	console.log(isGenerator(gen), out.length === result.length, out2.length === result.length, out.join("|") === result.join("|"), out2.join("|") === result.join("|"))
	console.log(isGenerator(gen$0), out.length === result.length, out.join("|") === result.join("|"))
}

{// simple with filter
	var arr1$1 = [1, 2, 3]
	var gen$1 = (function(){var $D$6;var $D$7;var $D$8;var a;var done$0=false;var init$0=false;return new Generator$0(function next$0(throw_error$0,throw$0){if(throw$0===true){done$0=true;}if(done$0===false){if(init$0===false){$D$6 = GET_ITER$0(arr1$1);$D$8 = $D$6 === 0;$D$7 = ($D$8 ? arr1$1.length : void 0);init$0=true;}while(true){if($D$8 ? ($D$6 < $D$7) : !($D$7 = $D$6["next"]())["done"]){a = ($D$8 ? arr1$1[$D$6++] : $D$7["value"]);;if(a != 2){return {"value":a,"done":false};}else {a=void 0;continue;}}else{;$D$6 = $D$7 = $D$8 = void 0;a=void 0;done$0=true;break;}}}if(done$0===true){if(this&&this["__next__"]===next$0){delete this["__next__"];delete this["__throw__"];};};if(throw$0===true){throw throw_error$0;};return {"value":void 0,"done":true};},function(err){if(this&&this["__next__"]){return this["__next__"](err,true);}else {throw err}})})()

	var out$0 = ITER$0(gen$1 )
//	let out2 = [];
//	for( let a of gen ) out2.push(a)

	var result$0 = arr1$1.filter(function(a) {
		return a != 2;
	});

	console.log(isGenerator(gen$1), out$0.length === result$0.length, out$0.join("|") === result$0.join("|"))
}

{// complex
	var arr1$2 = [1, 2, 3], arr2 = ['a', 'b', 'c']
	var gen$2 = (function(){var $D$9;var $D$10;var $D$11;var $D$12;var $D$13;var $D$14;var a,b;var done$0=false;var init$0=false;var init$1=false;var state$0=1,continue$0=false;return new Generator$0(function next$0(throw_error$0,throw$0){if(throw$0===true){done$0=true;}if(done$0===false){while(true){continue$0=false;switch(state$0){case 1:if(init$0===false){$D$9 = GET_ITER$0(arr1$2);$D$11 = $D$9 === 0;$D$10 = ($D$11 ? arr1$2.length : void 0);init$0=true;}continue$0=$D$11 ? ($D$9 < $D$10) : !($D$10 = $D$9["next"]())["done"];if(continue$0){a = ($D$11 ? arr1$2[$D$9++] : $D$10["value"]);state$0=2;}else {break;}case 2:if(init$1===false){$D$12 = GET_ITER$0(arr2);$D$14 = $D$12 === 0;$D$13 = ($D$14 ? arr2.length : void 0);init$1=true;}continue$0=$D$14 ? ($D$12 < $D$13) : !($D$13 = $D$12["next"]())["done"];if(continue$0){b = ($D$14 ? arr2[$D$12++] : $D$13["value"]);}else{state$0=1;init$1=false;;$D$12 = $D$13 = $D$14 = void 0;continue;};}if(continue$0){;return {"value":a + b,"done":false};}else{a=void 0;b=void 0;done$0=true;break}}}if(done$0===true){;$D$9 = $D$10 = $D$11 = void 0;;$D$12 = $D$13 = $D$14 = void 0;if(this&&this["__next__"]===next$0){delete this["__next__"];delete this["__throw__"];};};if(throw$0===true){throw throw_error$0;};return {"value":void 0,"done":true};},function(err){if(this&&this["__next__"]){return this["__next__"](err,true);}else {throw err}})})()

	var out$1 = ITER$0(gen$2 )
//	let out2 = [];
//	for( let a of gen ) out2.push(a)
	
	var result$1 = [].concat.apply([], arr1$2.map(function(a) {
		return arr2.map(function(b) {
			return a + b
		});
	}));

	console.log(isGenerator(gen$2), out$1.length === result$1.length, out$1.join("|") === result$1.join("|"))
}

{// complex with filter
	var arr1$3 = [1, 2, 3], arr2$0 = ['a', 'b', 'c']
	var gen$3 = (function(){var $D$15;var $D$16;var $D$17;var $D$18;var $D$19;var $D$20;var a,b;var done$0=false;var init$0=false;var init$1=false;var state$0=1,continue$0=false;return new Generator$0(function next$0(throw_error$0,throw$0){if(throw$0===true){done$0=true;}if(done$0===false){while(true){continue$0=false;switch(state$0){case 1:if(init$0===false){$D$15 = GET_ITER$0(arr1$3);$D$17 = $D$15 === 0;$D$16 = ($D$17 ? arr1$3.length : void 0);init$0=true;}continue$0=$D$17 ? ($D$15 < $D$16) : !($D$16 = $D$15["next"]())["done"];if(continue$0){a = ($D$17 ? arr1$3[$D$15++] : $D$16["value"]);state$0=2;}else {break;}case 2:if(init$1===false){$D$18 = GET_ITER$0(arr2$0);$D$20 = $D$18 === 0;$D$19 = ($D$20 ? arr2$0.length : void 0);init$1=true;}continue$0=$D$20 ? ($D$18 < $D$19) : !($D$19 = $D$18["next"]())["done"];if(continue$0){b = ($D$20 ? arr2$0[$D$18++] : $D$19["value"]);}else{state$0=1;init$1=false;;$D$18 = $D$19 = $D$20 = void 0;continue;};}if(continue$0){;if(a != 2 && b != 'b'){return {"value":a + b,"done":false};}else {continue;}}else{a=void 0;b=void 0;done$0=true;break}}}if(done$0===true){;$D$15 = $D$16 = $D$17 = void 0;;$D$18 = $D$19 = $D$20 = void 0;if(this&&this["__next__"]===next$0){delete this["__next__"];delete this["__throw__"];};};if(throw$0===true){throw throw_error$0;};return {"value":void 0,"done":true};},function(err){if(this&&this["__next__"]){return this["__next__"](err,true);}else {throw err}})})()

	var out$2 = ITER$0(gen$3 )
//	let out2 = [];
//	for( let a of gen ) out2.push(a)

	var result$2 = [].concat.apply([], arr1$3.map(function(a) {
		return arr2$0.map(function(b) {
			if (a != 2 && b != 'b') {
				return a + b
			}
			return void 0;
		});
	})).filter(function(r){ return r !== void 0 });

	console.log(isGenerator(gen$3), out$2.length === result$2.length, out$2.join("|") === result$2.join("|"))
}
