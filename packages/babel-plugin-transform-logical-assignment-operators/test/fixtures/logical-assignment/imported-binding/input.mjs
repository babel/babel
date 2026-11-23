import { obj } from "obj";

// The getters might reassign `obj`, so it must be memoized.
obj.a ||= 1;
obj.b &&= 2;
obj.c ??= 3;
