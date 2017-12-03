let x;
const y = 0;

{
    let x;
}

for (let i = 0; i < 10; ++i) {}

{
    let z;
}

{
    let z;
}

{
    let a;
    {
        let a;
    }
}

{
    let a;
    ({ a });
}

{
    let { x, y } = z;
}
