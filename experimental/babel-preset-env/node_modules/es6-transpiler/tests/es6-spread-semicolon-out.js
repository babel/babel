var $D$0;var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};var $D$1;var OC$0 = Object.create;
var result = 0;
var a = {b: {c: function(a, b){ result += (a + b) }}}, args = [1, 2]
;($D$0 = a.b).c.apply($D$0, ITER$0(args))
;(($D$1=(($D$0=OC$0(($D$1= a.b.c).prototype)),$D$1).apply($D$0, ITER$0(args)))&&typeof $D$1==='object'?$D$1:$D$0)

console.log(result === 6);$D$0 = void 0;;$D$1 = void 0;
