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
expect(test("nn")).toBe(true);

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
expect(test2({ x: "n" })).toBe(true);

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
expect(test3({ x: "x", y: "y" })).toBe(true);

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
expect(test4({ f: () => "test" })).toBe(true);

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
expect(test5("nn")).toBe(true);
