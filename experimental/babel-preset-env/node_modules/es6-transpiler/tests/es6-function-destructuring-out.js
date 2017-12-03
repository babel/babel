"use strict";

var dataset1 = [
    [ 191723, 191785 ], [ 191803, 191861 ], [ 191879, 191922 ],
    [ 192866, 192896 ], [ 193014, 193027 ], [ 193501, 193536 ],
    [0, 10], [0, 20], [0, 50], [50, 100], [50, 120], [50, 150],
    [150, 1000], [250, 1200], [350, 2000], [ 0, 1843 ]
].map( function(to$0) {var from = to$0[0], to = to$0[1];return { from: from, to: to, data: (("" + from) + ("-" + to) + "") }}  );
var dataset2 = dataset1.slice();

function sort1(to1, to2) {var from1 = to1.from, to1 = to1.to;var from2 = to2.from, to2 = to2.to;
    var res = from1 - from2;
    if( !res ) {
        if( to1 == to2 ) {
            return 0;
        }
        res = to1 - to2;
    }
    return res;
}

function sort2(a, b) {
    var from1 = a.from, to1 = a.to, from2 = b.from, to2 = b.to;
    var res = from1 - from2;
    if( !res ) {
        if( to1 == to2 ) {
            return 0;
        }
        res = to1 - to2;
    }
    return res;
}

function toRange(obj) {
    return obj.from + '-' + obj.to;
}


console.log(dataset1.sort(sort1).map(toRange).join("|") == dataset2.sort(sort2).map(toRange).join("|"));
