function testStrict() {
    "use strict";
    if (true) {
        function inner() {
            console.log('inner true');
        }
    } else {
        function inner() {
            console.log('inner false');
        }
    }
    inner();
}

class Test {
    test() {
        if (true) {
            function inner() {
                console.log('inner true');
            }
        } else {
            function inner() {
                console.log('inner false');
            }
        }
        inner();
    }
}

function testNonStrict() {
    if (true) {
        function inner() {
            console.log('inner true');
        }
    } else {
        function inner() {
            console.log('inner false');
        }
    }
    inner();
}
