"use strict";

// all three var x|y|z = 4 should be errors I believe so we error on all
//   v8 --harmony allows the first but not the second and last

if (true) {
    let x = 3;
    if (true) {
        var x = 4;
    }
}

let y = 3;
if (true) {
    var y = 4;
}

(function() {
    if (true) {
        let z = 3;
        if (true) {
            var z = 4;
        }
    }
})();
