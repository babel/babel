import 'module1';
import defaultImport from 'module2';
import * as namespace from 'module3';
import { pick } from 'module4';

defaultImport(namespace.foo, pick);

export { pick }
export default function () {}