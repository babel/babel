const defunct = {
  outer: {
    inner: {
      three: 'three',
      four: 'four'
    }
  }
}

const { outer: { inner: { three, ...other } } } = defunct
