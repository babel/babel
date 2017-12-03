// Original source from https://github.com/guybedford/systemjs on 2014-01-28
// at git sha 0beae8195df6a134567dff9458c895116332fb9f
// License MIT by Guy Bedford
// Modifications by traceur Authors 2014.

/*
  SystemJS map support

  Provides map configuration through
    System.map['jquery'] = 'some/module/Map.js'

  As well as contextual map config through
    System.map['bootstrap'] = {
      jquery: 'some/module/map2'
    }

  String properties are global maps, objects are contextual maps.

  Note that this applies for subpaths, just like RequireJS

  jquery      -> 'some/module/Map.js'
  jquery/path -> 'some/module/map/path'
  bootstrap   -> 'bootstrap'

  Inside any module name of the form 'bootstrap' or 'bootstrap/*'
    jquery    -> 'some/module/map2'
    jquery/p  -> 'some/module/map2/p'

  Maps are carefully applied from most specific contextual map, to least specific global map
*/

// return the number of prefix parts (separated by '/') matching the name
// eg prefixMatchLength('jquery/some/thing', 'jquery') -> 1
function prefixMatchLength(name, prefix) {
  var prefixParts = prefix.split('/');
  var nameParts = name.split('/');
  if (prefixParts.length > nameParts.length)
    return 0;
  for (var i = 0; i < prefixParts.length; i++) {
    if (nameParts[i] != prefixParts[i])
      return 0;
  }
  return prefixParts.length;
}

// given a relative-resolved module name and normalized parent name,
// apply the map configuration
function applyMap(map, name, parentName) {

  var curMatch, curMatchLength = 0;
  var curParent, curParentMatchLength = 0;

  // first find most specific contextual match
  if (parentName) {
    var mappedName;
    Object.getOwnPropertyNames(map).some(function(p) {
      var curMap = map[p];
      // Object properties are contextual map entries.
      if (curMap && typeof curMap === 'object') {
        // most specific parent match wins first
        if (prefixMatchLength(parentName, p) <= curParentMatchLength)
          return;

        Object.getOwnPropertyNames(curMap).forEach(function(q) {
          // most specific name match wins
          if (prefixMatchLength(name, q) > curMatchLength) {
            curMatch = q;
            curMatchLength = q.split('/').length;
            curParent = p;
            curParentMatchLength = p.split('/').length;
          }
        });
      }
      if (curMatch) {
        var subPath = name.split('/').splice(curMatchLength).join('/');
        mappedName =
            map[curParent][curMatch] + (subPath ? '/' + subPath : '');
        return mappedName;
      }
    });
  }

  if (mappedName)
    return mappedName;

  // if we didn't find a contextual match, try the global map
  Object.getOwnPropertyNames(map).forEach(function(p) {
    var curMap = map[p];
    // String properties are global map entries.
    if (curMap && typeof curMap === 'string') {
      if (prefixMatchLength(name, p) > curMatchLength) {
        curMatch = p;
        curMatchLength = p.split('/').length;
      }
    }
  });

  // return a match if any
  if (!curMatch)
    return name;

  var subPath = name.split('/').splice(curMatchLength).join('/');
  return map[curMatch] + (subPath ? '/' + subPath : '');
}

export var systemjs = {
  applyMap: applyMap
};