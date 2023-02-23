async function main(hello: string) {
    console.log(`Hello ${hello}`)
}

await main(process.argv.pop())
