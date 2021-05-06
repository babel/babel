/* ExpressionStatement */
let;
(let)[x];
(let)[x];
a[let[x]];
/* ForStatement */

for (let;;);

for ((let)[x];;);

for ((let)[x];;);

for (a[let[x]];;);
/* ForInStatement */


for (let in {});

for ((let)[x] in {});

for ((let)[x] in {});

for (a[let[x]] in {});
/* ForOfStatement { await: false } */


for ((let) of []);

for ((let) of []);

for ((let)[x] of []);

for (a[let] of []);
/* ForOfStatement { await: true } */


async () => {
  for await ((let) of []);

  for await ((let) of []);

  for await ((let)[x] of []);

  for await (a[let] of []);
};