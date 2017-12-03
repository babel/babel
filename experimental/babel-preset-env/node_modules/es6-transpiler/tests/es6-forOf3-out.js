var a = 1;

function matchAttributes(attributes) {var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;var f;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){if(S_MARK$0)S_MARK$0(void 0);return f.call(v);}if(S_MARK$0)S_MARK$0(void 0);if((v+'')==='[object Generator]')return v;}throw new Error(v+' is not iterable')};var $D$0;var $D$1;var $D$2;
    $D$0 = GET_ITER$0(attributes);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? attributes.length : void 0);for( var attrRule ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){attrRule = ($D$2 ? attributes[$D$0++] : $D$1["value"]);

    };$D$0 = $D$1 = $D$2 = void 0;
}

/*
 Test note:
 ! this test should be in a first line  !
 ! completed test: do not edit it       !
 */
