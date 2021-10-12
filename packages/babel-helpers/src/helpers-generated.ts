/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'yarn gulp generate-runtime-helpers'
 */

import template from "@babel/template";

function helper(minVersion, source) {
  return Object.freeze({
    minVersion,
    ast: () => template.program.ast(source),
  });
}

export default Object.freeze({
  asyncIterator: helper(
    "7.15.9",
    'export default function _asyncIterator(iterable){var method,async,sync,retry=2;if(typeof Symbol!=="undefined"){async=Symbol.asyncIterator;sync=Symbol.iterator}while(retry--){if(async&&(method=iterable[async])!=null){return method.call(iterable)}if(sync&&(method=iterable[sync])!=null){return new AsyncFromSyncIterator(method.call(iterable))}async="@@asyncIterator";sync="@@iterator"}throw new TypeError("Object is not async iterable")}function AsyncFromSyncIterator(s){AsyncFromSyncIterator=function(s){this.s=s;this.n=s.next};AsyncFromSyncIterator.prototype={s:null,n:null,next:function(){return AsyncFromSyncIteratorContinuation(this.n.apply(this.s,arguments))},return:function(value){var ret=this.s.return;if(ret===undefined){return Promise.resolve({value:value,done:true})}return AsyncFromSyncIteratorContinuation(ret.apply(this.s,arguments))},throw:function(value){var thr=this.s.return;if(thr===undefined)return Promise.reject(value);return AsyncFromSyncIteratorContinuation(thr.apply(this.s,arguments))}};function AsyncFromSyncIteratorContinuation(r){if(Object(r)!==r){return Promise.reject(new TypeError(r+" is not an object."))}var done=r.done;return Promise.resolve(r.value).then((function(value){return{value:value,done:done}}))}return new AsyncFromSyncIterator(s)}',
  ),
  jsx: helper(
    "7.0.0-beta.0",
    'var REACT_ELEMENT_TYPE;export default function _createRawReactElement(type,props,key,children){if(!REACT_ELEMENT_TYPE){REACT_ELEMENT_TYPE=typeof Symbol==="function"&&Symbol["for"]&&Symbol["for"]("react.element")||60103}var defaultProps=type&&type.defaultProps;var childrenLength=arguments.length-3;if(!props&&childrenLength!==0){props={children:void 0}}if(childrenLength===1){props.children=children}else if(childrenLength>1){var childArray=new Array(childrenLength);for(var i=0;i<childrenLength;i++){childArray[i]=arguments[i+3]}props.children=childArray}if(props&&defaultProps){for(var propName in defaultProps){if(props[propName]===void 0){props[propName]=defaultProps[propName]}}}else if(!props){props=defaultProps||{}}return{$$typeof:REACT_ELEMENT_TYPE,type:type,key:key===undefined?null:""+key,ref:null,props:props,_owner:null}}',
  ),
  objectSpread2: helper(
    "7.5.0",
    'import defineProperty from"defineProperty";function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly){symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))}keys.push.apply(keys,symbols)}return keys}export default function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach((function(key){defineProperty(target,key,source[key])}))}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}}return target}',
  ),
  typeof: helper(
    "7.0.0-beta.0",
    'export default function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function(obj){return typeof obj}}else{_typeof=function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}',
  ),
  wrapRegExp: helper(
    "7.2.6",
    'import setPrototypeOf from"setPrototypeOf";import inherits from"inherits";export default function _wrapRegExp(){_wrapRegExp=function(re,groups){return new BabelRegExp(re,undefined,groups)};var _super=RegExp.prototype;var _groups=new WeakMap;function BabelRegExp(re,flags,groups){var _this=new RegExp(re,flags);_groups.set(_this,groups||_groups.get(re));return setPrototypeOf(_this,BabelRegExp.prototype)}inherits(BabelRegExp,RegExp);BabelRegExp.prototype.exec=function(str){var result=_super.exec.call(this,str);if(result)result.groups=buildGroups(result,this);return result};BabelRegExp.prototype[Symbol.replace]=function(str,substitution){if(typeof substitution==="string"){var groups=_groups.get(this);return _super[Symbol.replace].call(this,str,substitution.replace(/\\$<([^>]+)>/g,(function(_,name){return"$"+groups[name]})))}else if(typeof substitution==="function"){var _this=this;return _super[Symbol.replace].call(this,str,(function(){var args=arguments;if(typeof args[args.length-1]!=="object"){args=[].slice.call(args);args.push(buildGroups(args,_this))}return substitution.apply(this,args)}))}else{return _super[Symbol.replace].call(this,str,substitution)}};function buildGroups(result,re){var g=_groups.get(re);return Object.keys(g).reduce((function(groups,name){groups[name]=result[g[name]];return groups}),Object.create(null))}return _wrapRegExp.apply(this,arguments)}',
  ),
});
