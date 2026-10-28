// The temporaries are declared without wrapping the loop bodies in blocks,
// whose new scopes would register the lowered nodes again.
for (var i = 0; i < 2; i++) ({ [k()]: a, ...b } = src);
for (var x of list) res = ({ [k()]: a, ...b } = f());
while (!a) ({ [k()]: a, ...b } = f());
do if (c) ({ [k()]: a, ...b } = f()); while (0);
for (;; ({ [k()]: a, ...b } = f())) break;
