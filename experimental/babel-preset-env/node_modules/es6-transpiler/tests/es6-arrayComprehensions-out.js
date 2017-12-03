var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;var f;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){if(S_MARK$0)S_MARK$0(void 0);return f.call(v);}if(S_MARK$0)S_MARK$0(void 0);if((v+'')==='[object Generator]')return v;}throw new Error(v+' is not iterable')};
{
	// simple / body in head and body in tail
	var result = void 0;
	result = (function(){var $D$0;var $D$1;var $D$2;var $D$3;var $D$4;var $D$5;var $D$6;var $D$7;var $D$8;var $D$9;var $D$10;var $D$11;var $result$0 = [], x,y,z;$D$3 = (['a', 'b', 'c']);$D$0 = GET_ITER$0($D$3);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? $D$3.length : void 0);for(;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){x = ($D$2 ? $D$3[$D$0++] : $D$1["value"]);$D$7 = ([1, 2, 3]);$D$4 = GET_ITER$0($D$7);$D$6 = $D$4 === 0;$D$5 = ($D$6 ? $D$7.length : void 0);for(;$D$6 ? ($D$4 < $D$5) : !($D$5 = $D$4["next"]())["done"];){y = ($D$6 ? $D$7[$D$4++] : $D$5["value"]);$D$11 = ([9, 8, 7]);$D$8 = GET_ITER$0($D$11);$D$10 = $D$8 === 0;$D$9 = ($D$10 ? $D$11.length : void 0);for(;$D$10 ? ($D$8 < $D$9) : !($D$9 = $D$8["next"]())["done"];){z = ($D$10 ? $D$11[$D$8++] : $D$9["value"]);{$result$0.push(x+y+z)}}}};return $result$0})();
	console.log(result.join(",") === "a19,a18,a17,a29,a28,a27,a39,a38,a37,b19,b18,b17,b29,b28,b27,b39,b38,b37,c19,c18,c17,c29,c28,c27,c39,c38,c37");

	result = (function(){var $D$12;var $D$13;var $D$14;var $D$15;var $D$16;var $D$17;var $D$18;var $D$19;var $D$20;var $D$21;var $D$22;var $D$23;var $result$1 = [], x,y,z;$D$15 = (['a', 'b', 'c']);$D$12 = GET_ITER$0($D$15);$D$14 = $D$12 === 0;$D$13 = ($D$14 ? $D$15.length : void 0);for(;$D$14 ? ($D$12 < $D$13) : !($D$13 = $D$12["next"]())["done"];){x = ($D$14 ? $D$15[$D$12++] : $D$13["value"]);$D$19 = ([1, 2, 3]);$D$16 = GET_ITER$0($D$19);$D$18 = $D$16 === 0;$D$17 = ($D$18 ? $D$19.length : void 0);for(;$D$18 ? ($D$16 < $D$17) : !($D$17 = $D$16["next"]())["done"];){y = ($D$18 ? $D$19[$D$16++] : $D$17["value"]);$D$23 = ([9, 8, 7]);$D$20 = GET_ITER$0($D$23);$D$22 = $D$20 === 0;$D$21 = ($D$22 ? $D$23.length : void 0);for(;$D$22 ? ($D$20 < $D$21) : !($D$21 = $D$20["next"]())["done"];){z = ($D$22 ? $D$23[$D$20++] : $D$21["value"]);{$result$1.push(x+y+z)}}}};return $result$1})();
	console.log(result.join(",") === "a19,a18,a17,a29,a28,a27,a39,a38,a37,b19,b18,b17,b29,b28,b27,b39,b38,b37,c19,c18,c17,c29,c28,c27,c39,c38,c37");
}

{
	// for-of with variables / body in head and body in tail
	var arr = [1, 2, 3];
	var arr2 = [5, 6, 7];

	var result$0 = void 0;
	result$0 = (function(){var $D$24;var $D$25;var $D$26;var $D$27;var $D$28;var $D$29;var $result$2 = [], x,y;$D$24 = GET_ITER$0(arr);$D$26 = $D$24 === 0;$D$25 = ($D$26 ? arr.length : void 0);for(;$D$26 ? ($D$24 < $D$25) : !($D$25 = $D$24["next"]())["done"];){x = ($D$26 ? arr[$D$24++] : $D$25["value"]);$D$27 = GET_ITER$0(arr2);$D$29 = $D$27 === 0;$D$28 = ($D$29 ? arr2.length : void 0);for(;$D$29 ? ($D$27 < $D$28) : !($D$28 = $D$27["next"]())["done"];){y = ($D$29 ? arr2[$D$27++] : $D$28["value"]);if(x % 2){$result$2.push(x * 2 * y)}}};return $result$2})();
	console.log(result$0.join("|") === [10, 12, 14, 30, 36, 42].join("|"));
	
	result$0 = (function(){var $D$30;var $D$31;var $D$32;var $D$33;var $D$34;var $D$35;var $result$3 = [], x,y;$D$30 = GET_ITER$0(arr);$D$32 = $D$30 === 0;$D$31 = ($D$32 ? arr.length : void 0);for(;$D$32 ? ($D$30 < $D$31) : !($D$31 = $D$30["next"]())["done"];){x = ($D$32 ? arr[$D$30++] : $D$31["value"]);$D$33 = GET_ITER$0(arr2);$D$35 = $D$33 === 0;$D$34 = ($D$35 ? arr2.length : void 0);for(;$D$35 ? ($D$33 < $D$34) : !($D$34 = $D$33["next"]())["done"];){y = ($D$35 ? arr2[$D$33++] : $D$34["value"]);if(x % 2){$result$3.push(x * 2 * y)}}};return $result$3})();
	console.log(result$0.join("|") === [10, 12, 14, 30, 36, 42].join("|"));
}

{
	// for-of and destrucuring
	var arr$0 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}, {b: 999}];

	var result$1 = void 0;
	result$1 = (function(){var $D$36;var $D$37;var $D$38;var $result$4 = [];var a, b;$D$36 = GET_ITER$0(arr$0);$D$38 = $D$36 === 0;$D$37 = ($D$38 ? arr$0.length : void 0);for(;$D$38 ? ($D$36 < $D$37) : !($D$37 = $D$36["next"]())["done"];){a = (b = ($D$38 ? arr$0[$D$36++] : $D$37["value"])).a, b = b.b;if(b !== 999){$result$4.push("_" + a)}};return $result$4})();
	console.log(result$1.join("|") === ["_1", "_2", "_3", "_4", "_5"].join("|"));
}

{
	// for-of and destrucuring / inner changes
	var arr$1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}, {b: 999}];

	var result$2 = void 0;
	result$2 = (function(){var $D$39;var $D$40;var $D$41;var $result$5 = [];var a, b;$D$39 = GET_ITER$0(arr$1);$D$41 = $D$39 === 0;$D$40 = ($D$41 ? arr$1.length : void 0);for(;$D$41 ? ($D$39 < $D$40) : !($D$40 = $D$39["next"]())["done"];){a = (b = ($D$41 ? arr$1[$D$39++] : $D$40["value"])).a, b = b.b;if((function(b){return b !== 999})(b)){$result$5.push((
		function (a) {
			var obj = {
				a: a
				, res: function() {return "_" + this.a}
			}
			return obj.res()
		}
		)(a))}};return $result$5})();
	console.log(result$2.join("|") === ["_1", "_2", "_3", "_4", "_5"].join("|"));
}

{
	// for-of and destrucuring with default values
	var arr$2 = [ {a: 'a1', b: 'b1'}, {b: 'b2', c: 'c3'}, {c: 'c3', a: 'a3'}, {a: 'a4', b: 'b4'}, {b: 'b5', c: 'c5'}, {c: 'c6', a: 'a6'}];

	var result$3 = void 0;
	result$3 = (function(){var $D$42;var $D$43;var $D$44;var $result$6 = [];var A, B, C;$D$42 = GET_ITER$0(arr$2);$D$44 = $D$42 === 0;$D$43 = ($D$44 ? arr$2.length : void 0);for(;$D$44 ? ($D$42 < $D$43) : !($D$43 = $D$42["next"]())["done"];){A = ((A = (C = ($D$44 ? arr$2[$D$42++] : $D$43["value"])).a) === void 0 ? 'A' : A), B = ((B = C.b) === void 0 ? 'B' : B), C = ((C = C.c) === void 0 ? 'C' : C);{$result$6.push(A + B + C)}};return $result$6})();
	console.log(result$3.join("|") === ["a1b1C","Ab2c3","a3Bc3","a4b4C","Ab5c5","a6Bc6"].join("|"));
}

{
	// simple / this using
	var obj = {
		arr: [ 1, 2, 3, 4, 5 ]
		, arr2: ["a", "b", "c"]
		, getResult: function() {
			return (function(){var $D$45;var $D$46;var $D$47;var $D$48;var $D$49;var $D$50;var $D$51;var $D$52;var $result$7 = [], x,y;$D$48 = (this.arr);$D$45 = GET_ITER$0($D$48);$D$47 = $D$45 === 0;$D$46 = ($D$47 ? $D$48.length : void 0);for(;$D$47 ? ($D$45 < $D$46) : !($D$46 = $D$45["next"]())["done"];){x = ($D$47 ? $D$48[$D$45++] : $D$46["value"]);$D$52 = (this.arr2);$D$49 = GET_ITER$0($D$52);$D$51 = $D$49 === 0;$D$50 = ($D$51 ? $D$52.length : void 0);for(;$D$51 ? ($D$49 < $D$50) : !($D$50 = $D$49["next"]())["done"];){y = ($D$51 ? $D$52[$D$49++] : $D$50["value"]);{$result$7.push(x + y)}}};return $result$7}).call(this)
		}
	}

	var result$4 = void 0;
	result$4 = obj.getResult();
	console.log(result$4.join("|") === ["1a","1b","1c","2a","2b","2c","3a","3b","3c","4a","4b","4c","5a","5b","5c"].join("|"));
}
