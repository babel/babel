import * as ns from 'module1'
import def from 'module2'
import { pick } from 'module3'

export default ns
export { ns, def, pick }
export * from 'module4'

export { foo, bar as baz } from 'module5'

import 'module6'