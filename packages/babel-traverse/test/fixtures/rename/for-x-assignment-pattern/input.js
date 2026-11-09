let a, b;
for ({ a } of []);
for ([b, a = a] of []);
for ({ x: { a = a }, [a]: b } in {});
for ({ ...a } in {});
for ([{ a: b.a }] of []);
for (a of []);
for (const { a } of []);
for (let [a] in {});
