// NOTE: star reexports are completely broken, but they also are broken in non-spec mode

export { foo } from 'foo'
import * as ns from 'bar'

ns[true && 'bar']
