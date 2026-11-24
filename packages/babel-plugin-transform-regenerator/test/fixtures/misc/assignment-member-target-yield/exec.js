// The object and key of an assignment target are evaluated before the
// right-hand side and only once.
var log = [];
var target = { a: 1, b: 2 };
var proxy = new Proxy(target, {
  get(t, k) { log.push("get " + String(k)); return t[k]; },
  set(t, k, v) { log.push("set " + String(k) + "=" + v); t[k] = v; return true; },
});
function obj() { log.push("obj"); return proxy; }
function key(k) { log.push("key"); return k; }

function* g() {
  obj()[key("a")] = yield;
  obj()[key("b")] += yield;
}
var it = g();
it.next();
log.push("resume");
it.next(10);
log.push("resume");
it.next(20);
expect(log).toEqual([
  "obj", "key", "resume", "set a=10",
  "obj", "key", "get b", "resume", "set b=22",
]);

// The target object is not re-read after resuming.
var o = { p: 1 };
function* h() { o.p = yield; }
var it2 = h();
it2.next();
var old = o;
o = { p: 2 };
it2.next(7);
expect(old.p).toBe(7);
expect(o.p).toBe(2);

// The key is evaluated only once by compound assignments.
var arr = [10, 20, 30];
var i = 0;
function* k() { arr[i++] += yield; }
var it3 = k();
it3.next();
it3.next(1);
expect(arr).toEqual([11, 20, 30]);
expect(i).toBe(1);
