import toArray from "toArray";

/*::

type PropertyDescriptor =
  | {
      value: any,
      writable: boolean,
      configurable: boolean,
      enumerable: boolean,
    }
  | {
      get?: () => any,
      set?: (v: any) => void,
      configurable: boolean,
      enumerable: boolean,
    };

type FieldDescriptor ={
  writable: boolean,
  configurable: boolean,
  enumerable: boolean,
};

type Placement = "static" | "prototype" | "own";
type Key = string | symbol; // PrivateName is not supported yet.

type ElementDescriptor =
  | {
      kind: "method",
      key: Key,
      placement: Placement,
      descriptor: PropertyDescriptor
    }
  | {
      kind: "field",
      key: Key,
      placement: Placement,
      descriptor: FieldDescriptor,
      initializer?: () => any,
    };

// This is exposed to the user code
type ElementObjectInput = ElementDescriptor & {
  [@@toStringTag]?: "Descriptor"
};

// This is exposed to the user code
type ElementObjectOutput = ElementDescriptor & {
  [@@toStringTag]?: "Descriptor"
  extras?: ElementDescriptor[],
  finisher?: ClassFinisher,
};

// This is exposed to the user code
type ClassObject = {
  [@@toStringTag]?: "Descriptor",
  kind: "class",
  elements: ElementDescriptor[],
};

type ElementDecorator = (descriptor: ElementObjectInput) => ?ElementObjectOutput;
type ClassDecorator = (descriptor: ClassObject) => ?ClassObject;
type ClassFinisher = <A, B>(cl: Class<A>) => Class<B>;

// Only used by Babel in the transform output, not part of the spec.
type ElementDefinition =
  | {
      kind: "method",
      value: any,
      key: Key,
      static?: boolean,
      decorators?: ElementDecorator[],
    }
  | {
      kind: "field",
      value: () => any,
      key: Key,
      static?: boolean,
      decorators?: ElementDecorator[],
  };

declare function ClassFactory<C>(initialize: (instance: C) => void): {
  F: Class<C>,
  d: ElementDefinition[]
}

*/

/*::
// Various combinations with/without extras and with one or many finishers

type ElementFinisherExtras = {
  element: ElementDescriptor,
  finisher?: ClassFinisher,
  extras?: ElementDescriptor[],
};

type ElementFinishersExtras = {
  element: ElementDescriptor,
  finishers: ClassFinisher[],
  extras: ElementDescriptor[],
};

type ElementsFinisher = {
  elements: ElementDescriptor[],
  finisher?: ClassFinisher,
};

type ElementsFinishers = {
  elements: ElementDescriptor[],
  finishers: ClassFinisher[],
};

*/

// ClassDefinitionEvaluation (Steps 26-*)
export default function _decorate(
  decorators /*: ClassDecorator[] */,
  factory /*: ClassFactory */,
) /*: Class<*> */ {
  var r = factory(function initialize(O) {
    _initializeInstanceElements(O, decorated.elements);
  });
  var decorated = _decorateClass(
    _coalesceClassElements(r.d.map(_createElementDescriptor)),
    decorators,
  );

  _initializeClassElements(r.F, decorated.elements);

  return _runClassFinishers(r.F, decorated.finishers);
}

// ClassElementEvaluation
function _createElementDescriptor(
  def /*: ElementDefinition */,
) /*: ElementDescriptor */ {
  var descriptor /*: PropertyDescriptor */;
  if (def.kind === "method") {
    descriptor = {
      value: def.value,
      writable: true,
      configurable: true,
      enumerable: false,
    };
  } else if (def.kind === "get") {
    descriptor = { get: def.value, configurable: true, enumerable: false };
  } else if (def.kind === "set") {
    descriptor = { set: def.value, configurable: true, enumerable: false };
  } else if (def.kind === "field") {
    descriptor = { configurable: true, writable: true, enumerable: false };
  }

  var element /*: ElementDescriptor */ = {
    kind: def.kind === "field" ? "field" : "method",
    key: def.key,
    placement: def.static
      ? "static"
      : def.kind === "field"
        ? "own"
        : "prototype",
    descriptor: descriptor,
  };
  if (def.decorators) element.decorators = def.decorators;
  if (def.kind === "field") element.initializer = def.value;

  return element;
}

// CoalesceGetterSetter
function _coalesceGetterSetter(
  element /*: ElementDescriptor */,
  other /*: ElementDescriptor */,
) {
  if (element.descriptor.get !== undefined) {
    other.descriptor.get = element.descriptor.get;
  } else {
    other.descriptor.set = element.descriptor.set;
  }
}

// CoalesceClassElements
function _coalesceClassElements(
  elements /*: ElementDescriptor[] */,
) /*: ElementDescriptor[] */ {
  var newElements /*: ElementDescriptor[] */ = [];

  var isSameElement = function(other /*: ElementDescriptor */) /*: boolean */ {
    return (
      other.kind === "method" &&
      other.key === element.key &&
      other.placement === element.placement
    );
  };

  for (var i = 0; i < elements.length; i++) {
    var element /*: ElementDescriptor */ = elements[i];
    var other /*: ElementDescriptor */;

    if (
      element.kind === "method" &&
      (other = newElements.find(isSameElement))
    ) {
      if (
        _isDataDescriptor(element.descriptor) ||
        _isDataDescriptor(other.descriptor)
      ) {
        if (_hasDecorators(element) || _hasDecorators(other)) {
          throw new ReferenceError(
            "Duplicated methods (" + element.key + ") can't be decorated.",
          );
        }
        other.descriptor = element.descriptor;
      } else {
        if (_hasDecorators(element)) {
          if (_hasDecorators(other)) {
            throw new ReferenceError(
              "Decorators can't be placed on different accessors with for " +
                "the same property (" +
                element.key +
                ").",
            );
          }
          other.decorators = element.decorators;
        }
        _coalesceGetterSetter(element, other);
      }
    } else {
      newElements.push(element);
    }
  }

  return newElements;
}

function _hasDecorators(element /*: ElementDescriptor */) /*: boolean */ {
  return element.decorators && element.decorators.length;
}

function _isDataDescriptor(desc /*: PropertyDescriptor */) /*: boolean */ {
  return (
    desc !== undefined &&
    !(desc.value === undefined && desc.writable === undefined)
  );
}

// InitializeClassElements
function _initializeClassElements /*::<C>*/(
  F /*: Class<C> */,
  elements /*: ElementDescriptor[] */,
) {
  var proto = F.prototype;

  ["method", "field"].forEach(function(kind) {
    elements.forEach(function(element /*: ElementDescriptor */) {
      var placement = element.placement;
      if (
        element.kind === kind &&
        (placement === "static" || placement === "prototype")
      ) {
        var receiver = placement === "static" ? F : proto;
        _defineClassElement(receiver, element);
      }
    });
  });
}

// InitializeInstanceElements
function _initializeInstanceElements /*::<C>*/(
  O /*: C */,
  elements /*: ElementDescriptor[] */,
) {
  ["method", "field"].forEach(function(kind) {
    elements.forEach(function(element /*: ElementDescriptor */) {
      if (element.kind === kind && element.placement === "own") {
        _defineClassElement(O, element);
      }
    });
  });
}

// DefineClassElement
function _defineClassElement /*::<C>*/(
  receiver /*: C | Class<C> */,
  element /*: ElementDescriptor */,
) {
  var descriptor /*: PropertyDescriptor */ = element.descriptor;
  if (element.kind === "field") {
    var initializer = element.initializer;
    descriptor = {
      enumerable: descriptor.enumerable,
      writable: descriptor.writable,
      configurable: descriptor.configurable,
      value: initializer === void 0 ? void 0 : initializer.call(receiver),
    };
  }
  Object.defineProperty(receiver, element.key, descriptor);
}

/*::

type Placements = {
  static: Key[],
  prototype: Key[],
  own: Key[],
};

*/

// DecorateClass
function _decorateClass(
  elements /*: ElementDescriptor[] */,
  decorators /*: ClassDecorator[] */,
) /*: ElementsFinishers */ {
  var newElements /*: ElementDescriptor[] */ = [];
  var finishers /*: ClassFinisher[] */ = [];
  var placements /*: Placements */ = { static: [], prototype: [], own: [] };

  elements.forEach(function(element /*: ElementDescriptor */) {
    _addElementPlacement(element, placements);
  });

  elements.forEach(function(element /*: ElementDescriptor */) {
    if (!_hasDecorators(element)) return newElements.push(element);

    var elementFinishersExtras /*: ElementFinishersExtras */ = _decorateElement(
      element,
      placements,
    );
    newElements.push(elementFinishersExtras.element);
    newElements.push.apply(newElements, elementFinishersExtras.extras);
    finishers.push.apply(finishers, elementFinishersExtras.finishers);
  });

  if (!decorators) {
    return { elements: newElements, finishers: finishers };
  }

  var result /*: ElementsFinishers */ = _decorateConstructor(
    newElements,
    decorators,
  );
  finishers.push.apply(finishers, result.finishers);
  result.finishers = finishers;

  return result;
}

// AddElementPlacement
function _addElementPlacement(
  element /*: ElementDescriptor */,
  placements /*: Placements */,
  silent /*: boolean */,
) {
  var keys = placements[element.placement];
  if (!silent && keys.indexOf(element.key) !== -1) {
    throw new TypeError("Duplicated element (" + element.key + ")");
  }
  keys.push(element.key);
}

// DecorateElement
function _decorateElement(
  element /*: ElementDescriptor */,
  placements /*: Placements */,
) /*: ElementFinishersExtras */ {
  var extras /*: ElementDescriptor[] */ = [];
  var finishers /*: ClassFinisher[] */ = [];

  for (
    var decorators = element.decorators, i = decorators.length - 1;
    i >= 0;
    i--
  ) {
    // (inlined) RemoveElementPlacement
    var keys = placements[element.placement];
    keys.splice(keys.indexOf(element.key), 1);

    var elementObject /*: ElementObjectInput */ = _fromElementDescriptor(
      element,
    );
    var elementFinisherExtras /*: ElementFinisherExtras */ = _toElementFinisherExtras(
      (0, decorators[i])(elementObject) /*: ElementObjectOutput */ ||
        elementObject,
    );

    element = elementFinisherExtras.element;
    _addElementPlacement(element, placements);

    if (elementFinisherExtras.finisher) {
      finishers.push(elementFinisherExtras.finisher);
    }

    var newExtras /*: ElementDescriptor[] | void */ =
      elementFinisherExtras.extras;
    if (newExtras) {
      for (var j = 0; j < newExtras.length; j++) {
        _addElementPlacement(newExtras[j], placements);
      }
      extras.push.apply(extras, newExtras);
    }
  }

  return { element: element, finishers: finishers, extras: extras };
}

// DecorateConstructor
function _decorateConstructor(
  elements /*: ElementDescriptor[] */,
  decorators /*: ClassDecorator[] */,
) /*: ElementsFinishers */ {
  var finishers /*: ClassFinisher[] */ = [];

  for (var i = decorators.length - 1; i >= 0; i--) {
    var obj /*: ClassObject */ = _fromClassDescriptor(elements);
    var elementsAndFinisher /*: ElementsFinisher */ = _toClassDescriptor(
      (0, decorators[i])(obj) /*: ClassObject */ || obj,
    );

    if (elementsAndFinisher.finisher !== undefined) {
      finishers.push(elementsAndFinisher.finisher);
    }

    if (elementsAndFinisher.elements !== undefined) {
      elements = elementsAndFinisher.elements;

      for (var j = 0; j < elements.length - 1; j++) {
        for (var k = j + 1; k < elements.length; k++) {
          if (
            elements[j].key === elements[k].key &&
            elements[j].placement === elements[k].placement
          ) {
            throw new TypeError("Duplicated element (" + elements[j].key + ")");
          }
        }
      }
    }
  }

  return { elements: elements, finishers: finishers };
}

// FromElementDescriptor
function _fromElementDescriptor(
  element /*: ElementDescriptor */,
) /*: ElementObject */ {
  var obj /*: ElementObject */ = {
    kind: element.kind,
    key: element.key,
    placement: element.placement,
    descriptor: element.descriptor,
  };

  var desc = {
    value: "Descriptor",
    configurable: true,
  };
  Object.defineProperty(obj, Symbol.toStringTag, desc);

  if (element.kind === "field") obj.initializer = element.initializer;

  return obj;
}

// ToElementDescriptors
function _toElementDescriptors(
  elementObjects /*: ElementObject[] */,
) /*: ElementDescriptor[] */ {
  if (elementObjects === undefined) return;
  return toArray(elementObjects).map(function(elementObject) {
    var element = _toElementDescriptor(elementObject);
    _disallowProperty(elementObject, "finisher", "An element descriptor");
    _disallowProperty(elementObject, "extras", "An element descriptor");
    return element;
  });
}

// ToElementDescriptor
function _toElementDescriptor(
  elementObject /*: ElementObject */,
) /*: ElementDescriptor */ {
  var kind = String(elementObject.kind);
  if (kind !== "method" && kind !== "field") {
    throw new TypeError(
      'An element descriptor\'s .kind property must be either "method" or' +
        ' "field", but a decorator created an element descriptor with' +
        ' .kind "' +
        kind +
        '"',
    );
  }

  var key = elementObject.key;
  if (typeof key !== "string" && typeof key !== "symbol") key = String(key);

  var placement = String(elementObject.placement);
  if (
    placement !== "static" &&
    placement !== "prototype" &&
    placement !== "own"
  ) {
    throw new TypeError(
      'An element descriptor\'s .placement property must be one of "static",' +
        ' "prototype" or "own", but a decorator created an element descriptor' +
        ' with .placement "' +
        placement +
        '"',
    );
  }

  var descriptor /*: PropertyDescriptor */ = elementObject.descriptor;

  _disallowProperty(elementObject, "elements", "An element descriptor");

  var element /*: ElementDescriptor */ = {
    kind: kind,
    key: key,
    placement: placement,
    descriptor: Object.assign({}, descriptor),
  };

  if (kind !== "field") {
    _disallowProperty(elementObject, "initializer", "A method descriptor");
  } else {
    _disallowProperty(
      descriptor,
      "get",
      "The property descriptor of a field descriptor",
    );
    _disallowProperty(
      descriptor,
      "set",
      "The property descriptor of a field descriptor",
    );
    _disallowProperty(
      descriptor,
      "value",
      "The property descriptor of a field descriptor",
    );

    element.initializer = elementObject.initializer;
  }

  return element;
}

function _toElementFinisherExtras(
  elementObject /*: ElementObject */,
) /*: ElementFinisherExtras */ {
  var element /*: ElementDescriptor */ = _toElementDescriptor(elementObject);
  var finisher /*: ClassFinisher */ = _optionalCallableProperty(
    elementObject,
    "finisher",
  );
  var extras /*: ElementDescriptors[] */ = _toElementDescriptors(
    elementObject.extras,
  );

  return { element: element, finisher: finisher, extras: extras };
}

// FromClassDescriptor
function _fromClassDescriptor(
  elements /*: ElementDescriptor[] */,
) /*: ClassObject */ {
  var obj = {
    kind: "class",
    elements: elements.map(_fromElementDescriptor),
  };

  var desc = { value: "Descriptor", configurable: true };
  Object.defineProperty(obj, Symbol.toStringTag, desc);

  return obj;
}

// ToClassDescriptor
function _toClassDescriptor(obj /*: ClassObject */) /*: ElementsFinisher */ {
  var kind = String(obj.kind);
  if (kind !== "class") {
    throw new TypeError(
      'A class descriptor\'s .kind property must be "class", but a decorator' +
        ' created a class descriptor with .kind "' +
        kind +
        '"',
    );
  }

  _disallowProperty(obj, "key", "A class descriptor");
  _disallowProperty(obj, "placement", "A class descriptor");
  _disallowProperty(obj, "descriptor", "A class descriptor");
  _disallowProperty(obj, "initializer", "A class descriptor");
  _disallowProperty(obj, "extras", "A class descriptor");

  var finisher = _optionalCallableProperty(obj, "finisher");
  var elements = _toElementDescriptors(obj.elements);

  return { elements: elements, finisher: finisher };
}

function _disallowProperty(obj, name, objectType) {
  if (obj[name] !== undefined) {
    throw new TypeError(objectType + " can't have a ." + name + " property.");
  }
}

function _optionalCallableProperty /*::<T>*/(
  obj /*: T */,
  name /*: $Keys<T> */,
) /*: ?Function */ {
  var value = obj[name];
  if (value !== undefined && typeof value !== "function") {
    throw new TypeError("Expected '" + name + "' to be a function");
  }
  return value;
}

// RunClassFinishers
function _runClassFinishers(
  constructor /*: Class<*> */,
  finishers /*: ClassFinisher[] */,
) /*: Class<*> */ {
  for (var i = 0; i < finishers.length; i++) {
    var newConstructor /*: ?Class<*> */ = (0, finishers[i])(constructor);
    if (newConstructor !== undefined) {
      // NOTE: This should check if IsConstructor(newConstructor) is false.
      if (typeof newConstructor !== "function") {
        throw new TypeError("Finishers must return a constructor.");
      }
      constructor = newConstructor;
    }
  }
  return constructor;
}
