/* @minVersion 7.21.0 */
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

type DecoratorFinishedRef = { v?: boolean };
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
      any?,
      Function?,
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

export default /* @no-mangle */ function applyDecs2305(
  targetClass: any,
  memberDecs: DecoratorInfo[],
  classDecs: Function[],
  classDecsHaveThis: number,
  instanceBrand: Function,
  parentClass: any,
) {
  function _bindPropCall(obj: any, name: string, before?: Function) {
    return function (_this: any, value?: any) {
      if (before) {
        before(_this);
      }
      return obj[name].call(_this, value);
    };
  }

  function runInitializers(initializers: Function[], value: any) {
    for (var i = 0; i < initializers.length; i++) {
      initializers[i].call(value);
    }
    return value;
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
    metadata: any,
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

    var decs = decInfo[0],
      decVal = decInfo[3],
      _: any,
      isClass = !ret;

    if (!isClass) {
      if (!decoratorsHaveThis && !Array.isArray(decs)) {
        decs = [decs];
      }

      var desc: PropertyDescriptor = {},
        init: Function[] = [],
        key: "get" | "set" | "value" =
          kind === PROP_KIND.GETTER
            ? "get"
            : kind === PROP_KIND.SETTER || isAccessor
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
          setFunctionName(
            desc[key],
            name,
            kind === PROP_KIND.METHOD ? "" : key,
          );
        }
      } else if (!isField) {
        desc = Object.getOwnPropertyDescriptor(Class, name);
      }
    }

    var newValue = Class;

    for (var i = decs.length - 1; i >= 0; i -= decoratorsHaveThis ? 2 : 1) {
      var dec = (decs as Function[])[i],
        decThis = decoratorsHaveThis ? (decs as any[])[i - 1] : void 0;

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

      try {
        if (isClass) {
          if (
            (_ = assertCallable(
              dec.call(decThis, newValue, ctx),
              "class decorators",
              "return",
            ))
          ) {
            newValue = _;
          }
        } else {
          ctx.static = isStatic;
          ctx.private = isPrivate;

          var get, set;
          if (!isPrivate) {
            get = function (target: any) {
              return target[name];
            };
            if (kind < PROP_KIND.METHOD || kind === PROP_KIND.SETTER) {
              set = function (target: any, v: any) {
                target[name] = v;
              };
            }
          } else if (kind === PROP_KIND.METHOD) {
            get = function (_this: any) {
              assertInstanceIfPrivate(_this);
              return desc.value;
            };
          } else {
            if (kind < PROP_KIND.SETTER) {
              get = _bindPropCall(desc, "get", assertInstanceIfPrivate);
            }
            if (kind !== PROP_KIND.GETTER) {
              set = _bindPropCall(desc, "set", assertInstanceIfPrivate);
            }
          }

          var access: DecoratorContextAccess = (ctx.access = {
            has: isPrivate
              ? // @ts-expect-error no thisArg
                hasPrivateBrand.bind()
              : function (target: object) {
                  return name in target;
                },
          });
          if (get) access.get = get;
          if (set) access.set = set;

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

          if (isAccessor) {
            if (typeof newValue === "object" && newValue) {
              if ((_ = assertCallable(newValue.get, "accessor.get"))) {
                desc.get = _;
              }
              if ((_ = assertCallable(newValue.set, "accessor.set"))) {
                desc.set = _;
              }
              if ((_ = assertCallable(newValue.init, "accessor.init"))) {
                init.push(_);
              }
            } else if (newValue !== void 0) {
              throw new TypeError(
                "accessor decorators must return an object with get, set, or init properties or void 0",
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
              init.push(newValue);
            } else {
              desc[key] = newValue;
            }
          }
        }
      } finally {
        decoratorFinishedRef.v = true;
      }
    }

    if (isField || isAccessor) {
      ret.push(function (instance: any, value: any) {
        for (var i = init.length - 1; i >= 0; i--) {
          value = init[i].call(instance, value);
        }
        return value;
      });
    }

    if (!isField && !isClass) {
      if (isPrivate) {
        if (isAccessor) {
          ret.push(_bindPropCall(desc, "get"), _bindPropCall(desc, "set"));
        } else {
          ret.push(
            kind === PROP_KIND.METHOD
              ? desc[key]
              : _bindPropCall.call.bind(desc[key]),
          );
        }
      } else {
        Object.defineProperty(Class, name, desc);
      }
    }
    return newValue;
  }

  /* @no-mangle */
  function applyMemberDecs(
    Class: any,
    decInfos: DecoratorInfo[],
    instanceBrand: Function,
    metadata: any,
  ) {
    var ret: Function[] = [];
    var protoInitializers: Function[];
    var staticInitializers: Function[];
    var staticBrand = function (_: any) {
      return checkInRHS(_) === Class;
    };

    var existingNonFields = new Map();

    function pushInitializers(initializers: Function[]) {
      if (initializers) {
        ret.push(runInitializers.bind(null, initializers));
      }
    }

    for (var i = 0; i < decInfos.length; i++) {
      var decInfo = decInfos[i];

      // skip computed property names
      if (!Array.isArray(decInfo)) continue;

      var kind = decInfo[1];
      var name = decInfo[2];
      var isPrivate = decInfo.length > 3;

      var decoratorsHaveThis = kind & PROP_KIND.DECORATORS_HAVE_THIS;
      var isStatic = !!(kind & PROP_KIND.STATIC);

      kind &= 7; /* 0b111 */

      var isField = kind === PROP_KIND.FIELD;

      var key = name + "/" + isStatic;

      if (!isField && !isPrivate) {
        var existingKind = existingNonFields.get(key);

        if (
          existingKind === true ||
          (existingKind === PROP_KIND.GETTER && kind !== PROP_KIND.SETTER) ||
          (existingKind === PROP_KIND.SETTER && kind !== PROP_KIND.GETTER)
        ) {
          throw new Error(
            "Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " +
              name,
          );
        }
        existingNonFields.set(key, kind > PROP_KIND.METHOD ? kind : true);
      }

      applyDec(
        isStatic ? Class : Class.prototype,
        decInfo,
        decoratorsHaveThis,
        isPrivate ? "#" + name : (toPropertyKey(name) as string),
        kind,
        metadata,
        isStatic
          ? (staticInitializers = staticInitializers || [])
          : (protoInitializers = protoInitializers || []),
        ret,
        isStatic,
        isPrivate,
        isField,
        kind === PROP_KIND.ACCESSOR,
        isStatic && isPrivate ? staticBrand : instanceBrand,
      );
    }

    pushInitializers(protoInitializers);
    pushInitializers(staticInitializers);
    return ret;
  }

  function defineMetadata(Class: any, metadata: any) {
    return Object.defineProperty(
      Class,
      Symbol.metadata || Symbol.for("Symbol.metadata"),
      { configurable: true, enumerable: true, value: metadata },
    );
  }

  if (arguments.length >= 6) {
    var parentMetadata =
      parentClass[Symbol.metadata || Symbol.for("Symbol.metadata")];
  }
  var metadata = Object.create(parentMetadata == null ? null : parentMetadata);
  var e = applyMemberDecs(targetClass, memberDecs, instanceBrand, metadata);
  if (!classDecs.length) defineMetadata(targetClass, metadata);
  return {
    e: e,
    // Lazily apply class decorations so that member init locals can be properly bound.
    get c() {
      // The transformer will not emit assignment when there are no class decorators,
      // so we don't have to return an empty array here.
      var initializers: Function[] = [];
      return (
        classDecs.length && [
          defineMetadata(
            applyDec(
              targetClass,
              [classDecs],
              classDecsHaveThis,
              targetClass.name,
              PROP_KIND.CLASS,
              metadata,
              initializers,
            ),
            metadata,
          ),
          runInitializers.bind(null, initializers, targetClass),
        ]
      );
    },
  };
}
