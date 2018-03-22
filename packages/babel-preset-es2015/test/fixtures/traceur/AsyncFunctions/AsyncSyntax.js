// Options: --async-functions

var async;
async
function f() {
  return async + async;
}

async = 1;
expect(async).toBe(1);
expect(f()).toBe(2);

async = async
function g() {

}

expect(async).toBe(1);
