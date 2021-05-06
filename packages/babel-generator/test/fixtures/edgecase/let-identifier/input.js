/* ExpressionStatement */
let;
\u006cet[x];
(let)[x];
a[let[x]];

/* ForStatement */
for (let;;);
for (\u006cet[x];;);
for ((let)[x];;);
for (a[let[x]];;);

/* ForInStatement */
for (let in {});
for (\u006cet[x] in {});
for ((let)[x] in {});
for (a[let[x]] in {});

/* ForOfStatement { await: false } */
for ((let) of []);
for (\u006cet of []);
for ((let)[x] of []);
for (a[let] of []);

/* ForOfStatement { await: true } */
async () => {
  for await ((let) of []);
  for await (\u006cet of []);
  for await ((let)[x] of []);
  for await (a[let] of []);
}
