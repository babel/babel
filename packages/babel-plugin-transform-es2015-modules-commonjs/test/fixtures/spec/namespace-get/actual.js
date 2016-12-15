import * as a from 'a'

const name = 'a'

const ident = a.a
const literal = a['a']
const computed = a[name]
const recursive = a[a[name]]
const symbol = a[Symbol.toStringTag]