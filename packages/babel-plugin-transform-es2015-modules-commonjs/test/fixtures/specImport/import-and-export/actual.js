import 'module1'
import * as module2 from 'module2'
import module3 from 'module3'
import { default as module4 } from 'module4'

module2.default(module3, module4)

export { module2, module3 }
