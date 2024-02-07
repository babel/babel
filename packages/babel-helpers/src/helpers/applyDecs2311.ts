/* @minVersion 7.23.0 */
/* @mangleFns */

import checkInRHS from "./checkInRHS.ts";
import setFunctionName from "./setFunctionName.ts";
import toPropertyKey from "./toPropertyKey.ts";

const enum PROP_KIND {
  FIELD = 0,
  ACCESSOR = 1,
  METHOD = 2,
  GETTER = 3,
  SETTER = 4,
  CLASS = 5,

  STATIC = 8,

  DECORATORS_HAVE_THIS = 16,
}

type DecoratorFinishedRef = { v?: number };
type DecoratorContextAccess = {
  get?: (target: object) => any;
  set?: (target: object, value: any) => void;
  has: (target: object) => boolean;
};
type DecoratorContext = {
  kind: "accessor" | "method" | "getter" | "setter" | "field" | "class";
  name: string;
  static?: boolean;
  private?: boolean;
  access?: DecoratorContextAccess;
  metadata?: any;
  addInitializer?: (initializer: Function) => void;
};
type DecoratorInfo =
  | [
      decs: Function | Function[],
      kind: PROP_KIND,
      name: string,
      privateGetter?: Function,
      privateSetter?: Function,
    ]
  | [classDecs: Function[]];

/**
  Basic usage:

  applyDecs(
    Class,
    [
      // member decorators
      [
        decs,               // dec, or array of decs, or array of this values and decs
        0,                  // kind of value being decorated
        'prop',             // name of public prop on class containing the value being decorated,
        '#p',               // the name of the private property (if is private, void 0 otherwise),
      ]
    ],
    [
      // class decorators
      dec1, dec2
    ]
  )
  ```

  Fully transpiled example:

  ```js
  @dec
  class Class {
    @dec
    a = 123;

    @dec
    #a = 123;

    @dec
    @dec2
    accessor b = 123;

    @dec
    accessor #b = 123;

    @dec
    c() { console.log('c'); }

    @dec
    #c() { console.log('privC'); }

    @dec
    get d() { console.log('d'); }

    @dec
    get #d() { console.log('privD'); }

    @dec
    set e(v) { console.log('e'); }

    @dec
    set #e(v) { console.log('privE'); }
  }


  // becomes
  let initializeInstance;
  let initializeClass;

  let initA;
  let initPrivA;

  let initB;
  let initPrivB, getPrivB, setPrivB;

  let privC;
  let privD;
  let privE;

  let Class;
  class _Class {
    static {
      let ret = applyDecs(
        this,
        [
          [dec, 0, 'a'],
          [dec, 0, 'a', (i) => i.#a, (i, v) => i.#a = v],
          [[dec, dec2], 1, 'b'],
          [dec, 1, 'b', (i) => i.#privBData, (i, v) => i.#privBData = v],
          [dec, 2, 'c'],
          [dec, 2, 'c', () => console.log('privC')],
          [dec, 3, 'd'],
          [dec, 3, 'd', () => console.log('privD')],
          [dec, 4, 'e'],
          [dec, 4, 'e', () => console.log('privE')],
        ],
        [
          dec
        ]
      );

      initA = ret[0];

      initPrivA = ret[1];

      initB = ret[2];

      initPrivB = ret[3];
      getPrivB = ret[4];
      setPrivB = ret[5];

      privC = ret[6];

      privD = ret[7];

      privE = ret[8];

      initializeInstance = ret[9];

      Class = ret[10]

      initializeClass = ret[11];
    }

    a = (initializeInstance(this), initA(this, 123));

    #a = initPrivA(this, 123);

    #bData = initB(this, 123);
    get b() { return this.#bData }
    set b(v) { this.#bData = v }

    #privBData = initPrivB(this, 123);
    get #b() { return getPrivB(this); }
    set #b(v) { setPrivB(this, v); }

    c() { console.log('c'); }

    #c(...args) { return privC(this, ...args) }

    get d() { console.log('d'); }

    get #d() { return privD(this); }

    set e(v) { console.log('e'); }

    set #e(v) { privE(this, v); }
  }

  initializeClass(Class);
 */

export default /* @no-mangle */ function applyDecs2311(
  targetClass: any,
  memberDecs: DecoratorInfo[],
  classDecs: Function[],
  classDecsHaveThis: number,
  instanceBrand: Function,
  parentClass: any,
) {
  var symbolMetadata = Symbol.metadata || Symbol.for("Symbol.metadata");
  var defineProperty = Object.defineProperty;
  var metadata: any;
  var existingNonFields: Record<string, number> = {};
  var hasClassDecs = classDecs.length;
  // This is a temporary variable for smaller helper size
  var _: any;

  function runInitializers(
    initializers: Function[],
    hasValue: 0 | 1,
    thisArg: any,
    value?: any,
  ) {
    for (var i = 0; i < initializers.length; i++) {
      value = initializers[i].apply(thisArg, hasValue ? [value] : []);
    }
    return hasValue ? value : thisArg;
  }

  function assertCallable(
    fn: any,
    hint1: string,
    hint2?: string,
    throwUndefined?: boolean,
  ) {
    if (typeof fn !== "function") {
      if (throwUndefined || fn !== void 0) {
        throw new TypeError(
          hint1 +
            " must " +
            (hint2 || "be") +
            " a function" +
            (throwUndefined ? "" : " or undefined"),
        );
      }
    }
    return fn;
  }

  /* @no-mangle */
  function applyDec(
    Class: any,
    decInfo: DecoratorInfo,
    decoratorsHaveThis: number,
    name: string,
    kind: PROP_KIND,
    initializers: Function[],
    ret?: Function[],
    isStatic?: boolean,
    isPrivate?: boolean,
    isField?: boolean,
    isAccessor?: boolean,
    hasPrivateBrand?: Function,
  ) {
    function assertInstanceIfPrivate(target: any) {
      if (!hasPrivateBrand(target)) {
        throw new TypeError(
          "Attempted to access private element on non-instance",
        );
      }
    }

    var decs = [].concat(decInfo[0]),
      decVal = decInfo[3],
      isClass = !ret,
      mapKey = name + "/" + isStatic;

    var isGetter = kind === PROP_KIND.GETTER;
    var isSetter = kind === PROP_KIND.SETTER;
    var isMethod = kind === PROP_KIND.METHOD;

    function markExistingNonField(hasSetter?: 1) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (!i && !isField && !isPrivate) {
        if (existingNonFields[mapKey + hasSetter]) {
          throw new Error(
            "Decorating two elements with the same name (" +
              name +
              ") is not supported yet",
          );
        }

        existingNonFields[mapKey + hasSetter] = 1;
      }
    }

    function _bindPropCall(name: keyof PropertyDescriptor, before?: Function) {
      return function (_this: any, value?: any) {
        if (before) {
          before(_this);
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return desc[name].call(_this, value);
      };
    }

    if (!isClass) {
      var desc: PropertyDescriptor = {},
        init: Function[] = [],
        key: "get" | "set" | "value" = isGetter
          ? "get"
          : isSetter || isAccessor
            ? "set"
            : "value";

      if (isPrivate) {
        if (isField || isAccessor) {
          desc = {
            get: setFunctionName(
              function (this: any) {
                return decVal(this);
              },
              name,
              "get",
            ),
            set: function (this: any, value: any) {
              decInfo[4](this, value);
            },
          };
        } else {
          desc[key] = decVal;
        }

        if (!isField) {
          setFunctionName(desc[key], name, isMethod ? "" : key);
        }
      } else if (!isField) {
        desc = Object.getOwnPropertyDescriptor(Class, name);
      }
    }

    var newValue = Class;

    for (var i = decs.length - 1; i >= 0; i -= decoratorsHaveThis ? 2 : 1) {
      var dec = (decs as Function[])[i],
        decThis = decoratorsHaveThis ? decs[i - 1] : void 0;

      var decoratorFinishedRef: DecoratorFinishedRef = {};
      var ctx: DecoratorContext = {
        kind: ["field", "accessor", "method", "getter", "setter", "class"][
          kind
        ] as any,

        name: name,
        metadata: metadata,
        addInitializer: function (
          decoratorFinishedRef: DecoratorFinishedRef,
          initializer: Function,
        ) {
          if (decoratorFinishedRef.v) {
            throw new Error(
              "attempted to call addInitializer after decoration was finished",
            );
          }
          assertCallable(initializer, "An initializer", "be", true);
          initializers.push(initializer);
        }.bind(null, decoratorFinishedRef),
      };

      if (isClass) {
        _ = dec.call(decThis, newValue, ctx);
        decoratorFinishedRef.v = 1;

        if (assertCallable(_, "class decorators", "return")) {
          newValue = _;
        }
      } else {
        ctx.static = isStatic;
        ctx.private = isPrivate;

        _ = ctx.access = {
          has: isPrivate
            ? // @ts-expect-error no thisArg
              hasPrivateBrand.bind()
            : function (target: object) {
                return name in target;
              },
        };

        if (!isSetter) {
          markExistingNonField();
          _.get = isPrivate
            ? isMethod
              ? function (_this: any) {
                  assertInstanceIfPrivate(_this);
                  return desc.value;
                }
              : _bindPropCall("get", assertInstanceIfPrivate)
            : function (target: any) {
                return target[name];
              };
        }
        if (!isGetter) {
          markExistingNonField(1);
          _.set = isPrivate
            ? _bindPropCall("set", assertInstanceIfPrivate)
            : function (target: any, v: any) {
                target[name] = v;
              };
        }

        newValue = dec.call(
          decThis,
          isAccessor
            ? {
                get: desc.get,
                set: desc.set,
              }
            : desc[key],
          ctx,
        );
        decoratorFinishedRef.v = 1;

        if (isAccessor) {
          if (typeof newValue === "object" && newValue) {
            if ((_ = assertCallable(newValue.get, "accessor.get"))) {
              desc.get = _;
            }
            if ((_ = assertCallable(newValue.set, "accessor.set"))) {
              desc.set = _;
            }
            if ((_ = assertCallable(newValue.init, "accessor.init"))) {
              init.unshift(_);
            }
          } else if (newValue !== void 0) {
            throw new TypeError(
              "accessor decorators must return an object with get, set, or init properties or undefined",
            );
          }
        } else if (
          assertCallable(
            newValue,
            (isField ? "field" : "method") + " decorators",
            "return",
          )
        ) {
          if (isField) {
            init.unshift(newValue);
          } else {
            desc[key] = newValue;
          }
        }
      }
    }

    // isField || isAccessor
    if (kind < PROP_KIND.METHOD) {
      ret.push(
        // init
        runInitializers.bind(null, init, 1),
        // init_extra
        runInitializers.bind(null, initializers, 0),
      );
    }

    if (!isField && !isClass) {
      if (isPrivate) {
        if (isAccessor) {
          // get and set should be returned before init_extra
          ret.splice(-1, 0, _bindPropCall("get"), _bindPropCall("set"));
        } else {
          ret.push(
            isMethod
              ? desc[key]
              : // Equivalent to `Function.call`, just to reduce code size
                runInitializers.call.bind(desc[key]),
          );
        }
      } else {
        defineProperty(Class, name, desc);
      }
    }
    return newValue;
  }

  /* @no-mangle */
  function applyMemberDecs() {
    var ret: Function[] = [];
    var protoInitializers: Function[];
    var staticInitializers: Function[];

    function pushInitializers(initializers: Function[]) {
      if (initializers) {
        ret.push(runInitializers.bind(null, initializers, 0));
      }
    }

    for (var i = 0; i < memberDecs.length; i++) {
      var decInfo = memberDecs[i];

      var kind = decInfo[1];
      var name = decInfo[2];
      var isPrivate = !!decInfo[3];

      var decoratorsHaveThis = kind & PROP_KIND.DECORATORS_HAVE_THIS;
      var isStatic = !!(kind & PROP_KIND.STATIC);

      kind &= 7; /* 0b111 */

      var isField = kind === PROP_KIND.FIELD;
      var isAccessor = kind === PROP_KIND.ACCESSOR;

      applyDec(
        isStatic ? targetClass : targetClass.prototype,
        decInfo,
        decoratorsHaveThis,
        isPrivate ? "#" + name : (toPropertyKey(name) as string),
        kind,
        isField || isAccessor
          ? /* fieldInitializers */ []
          : isStatic
            ? (staticInitializers = staticInitializers || [])
            : (protoInitializers = protoInitializers || []),
        ret,
        isStatic,
        isPrivate,
        isField,
        isAccessor,
        isStatic && isPrivate
          ? function (_: any) {
              return checkInRHS(_) === targetClass;
            }
          : instanceBrand,
      );
    }

    pushInitializers(protoInitializers);
    pushInitializers(staticInitializers);
    return ret;
  }

  function defineMetadata(Class: any) {
    return defineProperty(Class, symbolMetadata, {
      configurable: true,
      enumerable: true,
      value: metadata,
    });
  }

  if (parentClass !== undefined) {
    metadata = parentClass[symbolMetadata];
  }
  metadata = Object.create(metadata == null ? null : metadata);
  _ = applyMemberDecs();
  if (!hasClassDecs) defineMetadata(targetClass);
  return {
    e: _,
    // Lazily apply class decorations so that member init locals can be properly bound.
    get c() {
      // The transformer will not emit assignment when there are no class decorators,
      // so we don't have to return an empty array here.
      var initializers: Function[] = [];
      return (
        hasClassDecs && [
          defineMetadata(
            applyDec(
              targetClass,
              [classDecs],
              classDecsHaveThis,
              targetClass.name,
              PROP_KIND.CLASS,
              initializers,
            ),
          ),
          runInitializers.bind(null, initializers, 0, targetClass),
        ]
      );
    },
  };
}
