import 'a';
import defaultImport from 'b';
import * as namespace from 'c';
import { pick } from 'd';

defaultImport(namespace.foo, pick);

export { pick }
export default function () {}