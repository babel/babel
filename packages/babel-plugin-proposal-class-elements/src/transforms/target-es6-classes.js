import { types as t } from "@babel/core";
import {
  pushPrivateName,
  buildPrivateInstanceFieldInitSpec,
  buildPrivateStaticFieldInitSpec,
  buildPrivateInstanceMethodInitSpec,
  transformPrivateNamesUsage,
  buildPrivateFieldInitLoose,
  buildPrivateMethodInitLoose,
} from "../utils/private";
import { buildPublicFieldInitSpec } from "../utils/public";
import {
  injectInitialization,
  injectPureStatics,
  injectStaticInitialization,
  extractComputedKeys,
} from "../utils/misc";
import {
  getClassRefs,
  replaceInnerBindingReferences,
  replaceSupers,
  replaceThisContextInExtractedNodes,
} from "../utils/context";
import { map, mapFilter } from "../utils/fp";

export default function classElementsToES6(api) {
  const constantSuper = api.assumption("constantSuper");
  const noDocumentAll = api.assumption("noDocumentAll");
  const privateFieldsAsProperties = api.assumption("privateFieldsAsProperties");

  const ifPFAP = fn => {
    return privateFieldsAsProperties ? fn() : [];
  };

  const buildPrivateInstanceFieldInit = privateFieldsAsProperties
    ? buildPrivateFieldInitLoose
    : buildPrivateInstanceFieldInitSpec;
  const buildPrivateStaticFieldInit = privateFieldsAsProperties
    ? buildPrivateFieldInitLoose
    : buildPrivateStaticFieldInitSpec;

  return {
    Class(path, state) {
      const privateNamesMap = new Map();

      const eltsToRemove = [];
      const instanceFields = [];
      const staticFields = [];
      const instancePrivMethods = [];
      const staticPrivMethods = [];
      const computedPaths = [];
      let constructorPath;

      const {
        internalClassRef,
        getExternalClassRef,
        differentRefs,
        needsExternalClassRef,
      } = getClassRefs(path);

      for (const el of path.get("body.body")) {
        if (el.node.computed) {
          computedPaths.push(el);
        }

        const isStatic = el.node.static;
        if (el.isPrivate()) {
          pushPrivateName(privateNamesMap, el);
        }

        if (el.isClassPrivateProperty() || el.isClassProperty()) {
          (isStatic ? staticFields : instanceFields).push(el.node);
          eltsToRemove.push(el);
          continue;
        }

        if (el.isClassPrivateMethod()) {
          (isStatic ? staticPrivMethods : instancePrivMethods).push(el.node);

          replaceSupers(path, el, state, constantSuper);
          if (differentRefs) {
            replaceInnerBindingReferences(
              el,
              getExternalClassRef,
              internalClassRef,
            );
          }

          eltsToRemove.push(el);
          continue;
        }

        if (el.isClassMethod({ kind: "constructor" })) {
          constructorPath = el;
        }
      }

      if (eltsToRemove.length === 0) {
        // No class elements to transform
        return;
      }

      transformPrivateNamesUsage(
        internalClassRef,
        path,
        privateNamesMap,
        { privateFieldsAsProperties, noDocumentAll },
        state,
      );

      replaceThisContextInExtractedNodes(
        staticFields,
        eltsToRemove,
        path,
        getExternalClassRef,
        internalClassRef,
        state,
        constantSuper,
      );

      const keysNodes = extractComputedKeys(path, computedPaths, this.file);

      const initInstanceFields = map(node => {
        if (t.isPrivate(node)) {
          return buildPrivateInstanceFieldInit(
            node,
            path.scope,
            privateNamesMap,
          );
        } else {
          return buildPublicFieldInitSpec(t.thisExpression(), node, state);
        }
      });
      const initStaticFields = mapFilter(node => {
        if (t.isPrivate(node)) {
          return buildPrivateStaticFieldInit(
            node,
            path.scope,
            privateNamesMap,
            getExternalClassRef,
          );
        } else {
          return buildPublicFieldInitSpec(getExternalClassRef(), node, state);
        }
      });
      const initPrivMethods = privateFieldsAsProperties
        ? (nodes, getClassRef) =>
            mapFilter(node =>
              buildPrivateMethodInitLoose(
                node,
                path.scope,
                privateNamesMap,
                getClassRef,
              ),
            )(nodes)
        : mapFilter(node =>
            buildPrivateInstanceMethodInitSpec(
              node,
              path.scope,
              privateNamesMap,
            ),
          );

      const instanceInit = [
        ...initPrivMethods(instancePrivMethods),
        ...initInstanceFields(instanceFields),
      ];
      if (instanceInit.length > 0) {
        injectInitialization(
          path,
          constructorPath,
          instanceInit.map(p => t.expressionStatement(p)),
          (referenceVisitor, state) => {
            for (const el of eltsToRemove) {
              if (el.isClassProperty() || el.isClassPrivateProperty()) {
                el.traverse(referenceVisitor, state);
              }
            }
          },
        );
      }

      injectPureStatics({
        state,
        path,
        privateNamesMap,
        instancePrivMethods,
        staticPrivMethods,
        privateFieldsAsProperties,
      });

      injectStaticInitialization(
        path,
        keysNodes.map(n => t.expressionStatement(n)),
        [
          ...ifPFAP(() =>
            initPrivMethods(staticPrivMethods, getExternalClassRef),
          ),
          ...initStaticFields(staticFields),
        ].map(n => t.expressionStatement(n)),
        getExternalClassRef,
        needsExternalClassRef(),
      );

      eltsToRemove.forEach(el => el.remove());
    },
  };
}
