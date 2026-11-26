var _obj, _obj2, _obj3;
import { obj } from "obj";

// The getters might reassign `obj`, so it must be memoized.
(_obj = obj).a || (_obj.a = 1);
(_obj2 = obj).b && (_obj2.b = 2);
(_obj3 = obj).c ?? (_obj3.c = 3);
