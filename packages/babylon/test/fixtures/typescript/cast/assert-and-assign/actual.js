interface ResponseBody {
  name: string
  age: number
}

let response;
(response as ResponseBody) = {
  name: 'Alice',
  age: 23,
}