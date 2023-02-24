type FuncWithDescription = [
  function: (...args: any[]) => any,
  string: string
]

const fnWithDescriptions: FuncWithDescription[] = [
  [(x:number) => x, "return the number"],
  [(x:number, y:number) => x*y, "multiply the numbers"]
]
