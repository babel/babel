/* @minVersion 7.16.6 */

/**
  Enums are used in this file, but not assigned to vars to avoid non-hoistable values

  CONSTRUCTOR = 0;
  PUBLIC = 1;
  PRIVATE = 2;

  FIELD = 0;
  ACCESSOR = 1;
  METHOD = 2;
  GETTER = 3;
  SETTER = 4;

  STATIC = 5;
*/

function createMetadataMethodsForProperty(metadataMap, kind, property) {
  return {
    getMetadata(key) {
      if (typeof key !== "symbol") {
        throw new TypeError("Metadata keys must be symbols, received: " + key);
      }

      var metadataForKey = metadataMap[key];

      if (metadataForKey === void 0) return void 0;

      if (kind === 1 /* PUBLIC */) {
        var pub = metadataForKey.public;
        if (pub !== void 0) {
          return pub[property];
        }
      } else if (kind === 2 /* PRIVATE */) {
        var priv = metadataForKey.private;
        if (priv !== void 0) {
          return priv.get(property);
        }
      } else if (Object.hasOwnProperty.call(metadataForKey, "constructor")) {
        return metadataForKey.constructor;
      }
    },
    setMetadata(key, value) {
      if (typeof key !== "symbol") {
        throw new TypeError("Metadata keys must be symbols, received: " + key);
      }

      var metadataForKey = metadataMap[key];

      if (metadataForKey === void 0) {
        metadataForKey = metadataMap[key] = {};
      }

      if (kind === 1 /* PUBLIC */) {
        var pub = metadataForKey.public;

        if (pub === void 0) {
          pub = metadataForKey.public = Object.create(null);
        }

        pub[property] = value;
      } else if (kind === 2 /* PRIVATE */) {
        var priv = metadataForKey.priv;

        if (priv === void 0) {
          priv = metadataForKey.private = new Map();
        }

        priv.set(property, value);
      } else {
        metadataForKey.constructor = value;
      }
    },
  };
}

function convertMetadataMapToFinal(obj, metadataMap) {
  var parentMetadataMap = obj[Symbol.metadata];
  var metadataKeys = Object.getOwnPropertySymbols(metadataMap);

  if (metadataKeys.length === 0) return;

  for (var i = 0; i < metadataKeys.length; i++) {
    var key = metadataKeys[i];
    var metaForKey = metadataMap[key];
    var parentMetaForKey = parentMetadataMap ? parentMetadataMap[key] : null;

    var pub = metaForKey.public;
    var parentPub = parentMetaForKey ? parentMetaForKey.public : null;

    if (pub && parentPub) {
      Object.setPrototypeOf(pub, parentPub);
    }

    var priv = metaForKey.private;

    if (priv) {
      var privArr = Array.from(priv.values());
      var parentPriv = parentMetaForKey ? parentMetaForKey.private : null;

      if (parentPriv) {
        privArr = privArr.concat(parentPriv);
      }

      metaForKey.private = privArr;
    }

    if (parentMetaForKey) {
      Object.setPrototypeOf(metaForKey, parentMetaForKey);
    }
  }

  if (parentMetadataMap) {
    Object.setPrototypeOf(metadataMap, parentMetadataMap);
  }

  obj[Symbol.metadata] = metadataMap;
}

function createAddInitializerMethod(initializers) {
  return function addInitializer(initializer) {
    assertValidInitializer(initializer);
    initializers.push(initializer);
  };
}

function memberDecCtx(
  base,
  name,
  desc,
  metadataMap,
  initializers,
  kind,
  isStatic,
  isPrivate
) {
  var kindStr;

  switch (kind) {
    case 1 /* ACCESSOR */:
      kindStr = "accessor";
      break;
    case 2 /* METHOD */:
      kindStr = "method";
      break;
    case 3 /* GETTER */:
      kindStr = "getter";
      break;
    case 4 /* SETTER */:
      kindStr = "setter";
      break;
    default:
      kindStr = "field";
  }

  var ctx = {
    kind: kindStr,
    name: isPrivate ? "#" + name : name,
    isStatic: isStatic,
    isPrivate: isPrivate,
  };

  if (kind !== 0 /* FIELD */) {
    ctx.addInitializer = createAddInitializerMethod(initializers);
  }

  var metadataKind, metadataName;

  if (isPrivate) {
    metadataKind = 2 /* PRIVATE */;
    metadataName = Symbol(name);

    var access = {};

    if (kind === 0 /* FIELD */) {
      access.get = desc.get;
      access.set = desc.set;
    } else if (kind === 2 /* METHOD */) {
      access.get = function () {
        return desc.value;
      };
    } else {
      // replace with values that will go through the final getter and setter
      if (kind === 1 /* ACCESSOR */ || kind === 3 /* GETTER */) {
        access.get = function () {
          return desc.get.call(this);
        };
      }

      if (kind === 1 /* ACCESSOR */ || kind === 4 /* SETTER */) {
        access.set = function (v) {
          desc.set.call(this, v);
        };
      }
    }

    ctx.access = access;
  } else {
    metadataKind = 1 /* PUBLIC */;
    metadataName = name;
  }

  return Object.assign(
    ctx,
    createMetadataMethodsForProperty(metadataMap, metadataKind, metadataName)
  );
}

function assertValidInitializer(initializer) {
  if (typeof initializer !== "function") {
    throw new Error("initializers must be functions");
  }
}

function assertValidReturnValue(kind, value) {
  var type = typeof value;

  if (kind === 1 /* ACCESSOR */) {
    if (type !== "object" || value === null) {
      throw new Error(
        "accessor decorators must return an object with get, set, or initializer properties or void 0"
      );
    }
  } else if (type !== "function") {
    if (kind === 0 /* FIELD */) {
      throw new Error(
        "field decorators must return a initializer function or void 0"
      );
    } else {
      throw new Error("method decorators must return a function or void 0");
    }
  }
}

function applyMemberDec(
  ret,
  base,
  decInfo,
  name,
  kind,
  isStatic,
  isPrivate,
  metadataMap,
  initializers
) {
  var decs = decInfo[0];

  var desc, initializer, value;

  if (isPrivate) {
    if (kind === 0 /* FIELD */ || kind === 1 /* ACCESSOR */) {
      desc = {
        get: decInfo[3],
        set: decInfo[4],
      };
    } else if (kind === 3 /* GETTER */) {
      desc = {
        get: decInfo[3],
      };
    } else if (kind === 4 /* SETTER */) {
      desc = {
        set: decInfo[3],
      };
    } else {
      desc = {
        value: decInfo[3],
      };
    }
  } else if (kind !== 0 /* FIELD */) {
    desc = Object.getOwnPropertyDescriptor(base, name);
  }

  if (kind === 1 /* ACCESSOR */) {
    value = {
      get: desc.get,
      set: desc.set,
    };
  } else if (kind === 2 /* METHOD */) {
    value = desc.value;
  } else if (kind === 3 /* GETTER */) {
    value = desc.get;
  } else if (kind === 4 /* SETTER */) {
    value = desc.set;
  }

  var ctx = memberDecCtx(
    base,
    name,
    desc,
    metadataMap,
    initializers,
    kind,
    isStatic,
    isPrivate
  );

  var newValue, get, set;

  if (typeof decs === "function") {
    newValue = decs(value, ctx);

    if (newValue !== void 0) {
      assertValidReturnValue(kind, newValue);

      if (kind === 0 /* FIELD */) {
        initializer = newValue;
      } else if (kind === 1 /* ACCESSOR */) {
        initializer = newValue.initializer;

        get = newValue.get || value.get;
        set = newValue.set || value.set;

        value = { get: get, set: set };
      } else {
        value = newValue;
      }
    }
  } else {
    for (var i = 0; i < decs.length; i++) {
      var dec = decs[i];

      newValue = dec(value, ctx);

      if (newValue !== void 0) {
        assertValidReturnValue(kind, newValue);
        var newInit;

        if (kind === 0 /* FIELD */) {
          newInit = newValue;
        } else if (kind === 1 /* ACCESSOR */) {
          newInit = newValue.initializer;

          get = newValue.get || value.get;
          set = newValue.set || value.set;

          value = { get: get, set: set };
        } else {
          value = newValue;
        }

        if (newInit !== void 0) {
          if (initializer === void 0) {
            initializer = newInit;
          } else if (typeof initializer === "function") {
            initializer = [initializer, newInit];
          } else {
            initializer.push(newInit);
          }
        }
      }
    }
  }

  if (kind === 0 /* FIELD */ || kind === 1 /* ACCESSOR */) {
    if (initializer === void 0) {
      // If the initializer was void 0, sub in a dummy initializer
      initializer = function (instance, init) {
        return init;
      };
    } else if (typeof initializer !== "function") {
      var ownInitializers = initializer;

      initializer = function (instance, init) {
        var value = init;

        for (var i = 0; i < ownInitializers.length; i++) {
          value = ownInitializers[i].call(instance, value);
        }

        return value;
      };
    } else {
      var originalInitializer = initializer;

      initializer = function (instance, init) {
        return originalInitializer.call(instance, init);
      };
    }

    ret.push(initializer);
  }

  if (kind !== 0 /* FIELD */) {
    if (kind === 1 /* ACCESSOR */) {
      desc.get = value.get;
      desc.set = value.set;
    } else if (kind === 2 /* METHOD */) {
      desc.value = value;
    } else if (kind === 3 /* GETTER */) {
      desc.get = value;
    } else if (kind === 4 /* SETTER */) {
      desc.set = value;
    }

    if (isPrivate) {
      if (kind === 1 /* ACCESSOR */) {
        ret.push(function (instance, args) {
          return value.get.call(instance, args);
        });
        ret.push(function (instance, args) {
          return value.set.call(instance, args);
        });
      } else if (kind === 2 /* METHOD */) {
        ret.push(value);
      } else {
        ret.push(function (instance, args) {
          return value.call(instance, args);
        });
      }
    } else {
      Object.defineProperty(base, name, desc);
    }
  }
}

function applyMemberDecs(
  ret,
  Class,
  protoMetadataMap,
  staticMetadataMap,
  decInfos
) {
  var protoInitializers;
  var staticInitializers;

  var existingProtoNonFields = new Map();
  var existingStaticNonFields = new Map();

  for (var i = 0; i < decInfos.length; i++) {
    var decInfo = decInfos[i];

    // skip computed property names
    if (!Array.isArray(decInfo)) continue;

    var kind = decInfo[1];
    var name = decInfo[2];
    var isPrivate = decInfo.length > 3;

    var isStatic = kind >= 5; /* STATIC */
    var base;
    var metadataMap;
    var initializers;

    if (isStatic) {
      base = Class;
      metadataMap = staticMetadataMap;
      kind = kind - 5 /* STATIC */;

      if (!staticInitializers) {
        staticInitializers = [];
      }

      initializers = staticInitializers;
    } else {
      base = Class.prototype;
      metadataMap = protoMetadataMap;

      if (!protoInitializers) {
        protoInitializers = [];
      }

      initializers = protoInitializers;
    }

    if (kind !== 0 /* FIELD */ && !isPrivate) {
      var existingNonFields = isStatic
        ? existingStaticNonFields
        : existingProtoNonFields;

      var existingKind = existingNonFields.get(name) || 0;

      if (
        existingKind === true ||
        (existingKind === 3 /* GETTER */ && kind !== 4) /* SETTER */ ||
        (existingKind === 4 /* SETTER */ && kind !== 3) /* GETTER */
      ) {
        throw new Error(
          "Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " +
            name
        );
      } else if (!existingKind && kind > 2 /* METHOD */) {
        existingNonFields.set(name, kind);
      } else {
        existingNonFields.set(name, true);
      }
    }

    applyMemberDec(
      ret,
      base,
      decInfo,
      name,
      kind,
      isStatic,
      isPrivate,
      metadataMap,
      initializers
    );
  }

  if (protoInitializers) {
    pushInitializers(ret, protoInitializers);
  }

  if (staticInitializers) {
    pushInitializers(ret, staticInitializers);
  }
}

function pushInitializers(ret, initializers) {
  if (initializers.length > 0) {
    // Slice the array, which means that `addInitializer` can no longer add
    // additional initializers to the array
    initializers = initializers.slice();

    ret.push(function (instance) {
      for (var i = 0; i < initializers.length; i++) {
        initializers[i].call(instance, instance);
      }
      return instance;
    });
  } else {
    ret.push(function (instance) {
      return instance;
    });
  }
}

function applyClassDecs(ret, targetClass, metadataMap, classDecs) {
  var initializers = [];
  var newClass = targetClass;

  var name = targetClass.name;
  var ctx = Object.assign(
    {
      kind: "class",
      name: name,
      addInitializer: createAddInitializerMethod(initializers),
    },
    createMetadataMethodsForProperty(metadataMap, 0 /* CONSTRUCTOR */, name)
  );

  for (var i = 0; i < classDecs.length; i++) {
    newClass = classDecs[i](newClass, ctx) || newClass;
  }

  ret.push(newClass);

  if (initializers.length > 0) {
    ret.push(function () {
      for (var i = 0; i < initializers.length; i++) {
        initializers[i].call(newClass, newClass);
      }
    });
  } else {
    ret.push(function () {});
  }
}

/**
  Basic usage:

  applyDecs(
    Class,
    [
      // member decorators
      [
        dec,                // dec or array of decs
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
      )

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
export default function applyDecs(targetClass, memberDecs, classDecs) {
  var ret = [];
  var staticMetadataMap = {};

  if (memberDecs) {
    var protoMetadataMap = {};

    applyMemberDecs(
      ret,
      targetClass,
      protoMetadataMap,
      staticMetadataMap,
      memberDecs
    );

    convertMetadataMapToFinal(targetClass.prototype, protoMetadataMap);
  }

  if (classDecs) {
    applyClassDecs(ret, targetClass, staticMetadataMap, classDecs);
  }

  convertMetadataMapToFinal(targetClass, staticMetadataMap);

  return ret;
}
