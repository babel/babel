async function test () {
  console.log('test')
}

async function main () {
  console.log(await test())
}

main()
