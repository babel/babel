case (res) {
  when a -> {
    console.log(`size is ${s}`)
  }
  when b -> {
    console.log('JSON not found')
  }
  when status if (status >= 400) -> {
    throw new RequestError(res)
  }
}
