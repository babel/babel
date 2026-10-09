// Test 1: switch(e)
function test(e) {
    let i = e;
    {
        const e = i[0];
        switch (e) {
            case "n":
                const e = 1;
                return true;
            default:
                return false;
        }
    }
}
console.log(test("nn"));

// Test 2: switch(e.x)
function test2(e) {
    let i = e;
    {
        const e = { x: "test" };
        switch (e.x) {
            case "test":
                const e = 1;
                return true;
            default:
                return false;
        }
    }
}
console.log(test2({ x: "n" }));

// Test 3: switch(e.x + e.y)
function test3(e) {
    let i = e;
    {
        const e = { x: "te", y: "st" };
        switch (e.x + e.y) {
            case "test":
                const e = 1;
                return true;
            default:
                return false;
        }
    }
}
console.log(test3({ x: "x", y: "y" }));

// Test 4: switch(e.f())
function test4(e) {
    let i = e;
    {
        const e = { f: () => "test" };
        switch (e.f()) {
            case "test":
                const e = 1;
                return true;
            default:
                return false;
        }
    }
}
console.log(test4({ f: () => "test" }));

// Test 5: switch(id(e))
function id(v) {
    return v;
}

function test5(e) {
    let i = e;
    {
        const e = i[0];
        switch (id(e)) {
            case "n":
                const e = 1;
                return true;
            default:
                return false;
        }
    }
}
console.log(test5("nn"));
