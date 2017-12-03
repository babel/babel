var path = require('path')
var e2c = require('electron-to-chromium/versions')
var fs = require('fs')

var agents = require('caniuse-lite/dist/unpacker/agents').agents
var region = require('caniuse-lite/dist/unpacker/region').default

function normalize (versions) {
  return versions.filter(function (version) {
    return typeof version === 'string'
  })
}

function nameMapper (name) {
  return function mapName (version) {
    return name + ' ' + version
  }
}

function getMajor (version) {
  return parseInt(version.split('.')[0])
}

function getMajorVersions (released, number) {
  if (released.length === 0) return []
  var minimum = getMajor(released[released.length - 1]) - parseInt(number) + 1
  var selected = []
  for (var i = released.length - 1; i >= 0; i--) {
    if (minimum > getMajor(released[i])) break
    selected.unshift(released[i])
  }
  return selected
}

var env = process.env

var FLOAT_RANGE = /^\d+(\.\d+)?(-\d+(\.\d+)?)*$/
var IS_SECTION = /^\s*\[(.+)\]\s*$/

function uniq (array) {
  var filtered = []
  for (var i = 0; i < array.length; i++) {
    if (filtered.indexOf(array[i]) === -1) filtered.push(array[i])
  }
  return filtered
}

function BrowserslistError (message) {
  this.name = 'BrowserslistError'
  this.message = message || ''
  this.browserslist = true
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, BrowserslistError)
  }
}
BrowserslistError.prototype = Error.prototype

// Helpers

function fillUsage (result, name, data) {
  for (var i in data) {
    result[name + ' ' + i] = data[i]
  }
}

var filenessCache = {}
var configCache = {}

function isFile (file) {
  if (file in filenessCache) {
    return filenessCache[file]
  }
  var result = fs.existsSync(file) && fs.statSync(file).isFile()
  if (!env.BROWSERSLIST_DISABLE_CACHE) {
    filenessCache[file] = result
  }
  return result
}

function eachParent (file, callback) {
  var loc = path.resolve(file)
  do {
    var result = callback(loc)
    if (typeof result !== 'undefined') return result
  } while (loc !== (loc = path.dirname(loc)))
  return undefined
}

function getStat (opts) {
  if (opts.stats) {
    return opts.stats
  } else if (env.BROWSERSLIST_STATS) {
    return env.BROWSERSLIST_STATS
  } else if (opts.path && path.resolve) {
    return eachParent(opts.path, function (dir) {
      var file = path.join(dir, 'browserslist-stats.json')
      return isFile(file) ? file : undefined
    })
  }

  return undefined
}

function parsePackage (file) {
  var config = JSON.parse(fs.readFileSync(file))
  if (config.browserlist && !config.browserslist) {
    throw new BrowserslistError(
      '`browserlist` key instead of `browserslist` in ' + file)
  }
  var list = config.browserslist
  if (typeof list === 'object' && list.length) {
    list = { defaults: list }
  }
  return list
}

function pickEnv (config, opts) {
  if (typeof config !== 'object') return config

  var name
  if (typeof opts.env === 'string') {
    name = opts.env
  } else if (env.BROWSERSLIST_ENV) {
    name = env.BROWSERSLIST_ENV
  } else if (env.NODE_ENV) {
    name = env.NODE_ENV
  } else {
    name = 'development'
  }

  return config[name] || config.defaults
}

function generateFilter (sign, version) {
  version = parseFloat(version)
  if (sign === '>') {
    return function (v) {
      return parseFloat(v) > version
    }
  } else if (sign === '>=') {
    return function (v) {
      return parseFloat(v) >= version
    }
  } else if (sign === '<') {
    return function (v) {
      return parseFloat(v) < version
    }
  } else {
    return function (v) {
      return parseFloat(v) <= version
    }
  }
}

function compareStrings (a, b) {
  if (a < b) return -1
  if (a > b) return +1
  return 0
}

function resolve (queries, context) {
  return queries.reduce(function (result, selection, index) {
    if (selection.trim() === '') return result

    var isExclude = selection.indexOf('not ') === 0
    if (isExclude) {
      if (index === 0) {
        throw new BrowserslistError(
          'Write any browsers query (for instance, `defaults`) ' +
          'before `' + selection + '`')
      }
      selection = selection.slice(4)
    }

    for (var i = 0; i < QUERIES.length; i++) {
      var type = QUERIES[i]
      var match = selection.match(type.regexp)
      if (match) {
        var args = [context].concat(match.slice(1))
        var array = type.select.apply(browserslist, args)
        if (isExclude) {
          array = array.concat(array.map(function (j) {
            return j.replace(/\s\d+/, ' 0')
          }))
          return result.filter(function (j) {
            return array.indexOf(j) === -1
          })
        }
        return result.concat(array)
      }
    }

    throw new BrowserslistError('Unknown browser query `' + selection + '`')
  }, [])
}

/**
 * Return array of browsers by selection queries.
 *
 * @param {(string|string[])} [queries=browserslist.defaults] Browser queries.
 * @param {object} opts Options.
 * @param {string} [opts.path="."] Path to processed file.
 *                                 It will be used to find config files.
 * @param {string} [opts.env="development"] Processing environment.
 *                                          It will be used to take right
 *                                          queries from config file.
 * @param {string} [opts.config] Path to config file with queries.
 * @param {object} [opts.stats] Custom browser usage statistics
 *                              for "> 1% in my stats" query.
 * @return {string[]} Array with browser names in Can I Use.
 *
 * @example
 * browserslist('IE >= 10, IE 8') //=> ['ie 11', 'ie 10', 'ie 8']
 */
function browserslist (queries, opts) {
  if (typeof opts === 'undefined') opts = { }

  if (!opts.hasOwnProperty('path')) {
    opts.path = path.resolve ? path.resolve('.') : '.'
  }

  if (typeof queries === 'undefined' || queries === null) {
    if (env.BROWSERSLIST) {
      queries = env.BROWSERSLIST
    } else if (opts.config || env.BROWSERSLIST_CONFIG) {
      var file = opts.config || env.BROWSERSLIST_CONFIG
      if (path.basename(file) === 'package.json') {
        queries = pickEnv(parsePackage(file), opts)
      } else {
        queries = pickEnv(browserslist.readConfig(file), opts)
      }
    } else if (opts.path) {
      queries = pickEnv(browserslist.findConfig(opts.path), opts)
    }
  }

  if (typeof queries === 'undefined' || queries === null) {
    queries = browserslist.defaults
  }

  if (typeof queries === 'string') {
    queries = queries.split(/,\s*/)
  }

  if (!Array.isArray(queries)) {
    throw new BrowserslistError(
      'Browser queries must be an array. Got ' + typeof queries + '.')
  }

  var context = { dangerousExtend: opts.dangerousExtend }

  var stats = getStat(opts)
  if (stats) {
    if (typeof stats === 'string') {
      try {
        stats = JSON.parse(fs.readFileSync(stats))
      } catch (e) {
        throw new BrowserslistError('Can\'t read ' + stats)
      }
    }
    if ('dataByBrowser' in stats) {
      stats = stats.dataByBrowser
    }

    context.customUsage = { }
    for (var browser in stats) {
      fillUsage(context.customUsage, browser, stats[browser])
    }
  }

  var result = resolve(queries, context).map(function (i) {
    var parts = i.split(' ')
    var name = parts[0]
    var version = parts[1]
    if (version === '0') {
      return name + ' ' + byName(name).versions[0]
    } else {
      return i
    }
  }).sort(function (name1, name2) {
    name1 = name1.split(' ')
    name2 = name2.split(' ')
    if (name1[0] === name2[0]) {
      if (FLOAT_RANGE.test(name1[1]) && FLOAT_RANGE.test(name2[1])) {
        return parseFloat(name2[1]) - parseFloat(name1[1])
      } else {
        return compareStrings(name2[1], name1[1])
      }
    } else {
      return compareStrings(name1[0], name2[0])
    }
  })

  return uniq(result)
}

function normalizeVersion (data, version) {
  if (data.versions.indexOf(version) !== -1) {
    return version
  } else if (browserslist.versionAliases[data.name][version]) {
    return browserslist.versionAliases[data.name][version]
  } else if (data.versions.length === 1) {
    return data.versions[0]
  } else {
    return false
  }
}

function loadCountryStatistics (country) {
  country = country.replace(/[^\w-]/g, '')
  if (!browserslist.usage[country]) {
    var usage = { }
    // eslint-disable-next-line security/detect-non-literal-require
    var compressed = require('caniuse-lite/data/regions/' + country + '.js')
    var data = region(compressed)
    for (var i in data) {
      fillUsage(usage, i, data[i])
    }
    browserslist.usage[country] = usage
  }
}

// Will be filled by Can I Use data below
browserslist.data = { }
browserslist.usage = {
  global: { },
  custom: null
}

// Default browsers query
browserslist.defaults = [
  '> 1%',
  'last 2 versions',
  'Firefox ESR'
]

// Browser names aliases
browserslist.aliases = {
  fx: 'firefox',
  ff: 'firefox',
  ios: 'ios_saf',
  explorer: 'ie',
  blackberry: 'bb',
  explorermobile: 'ie_mob',
  operamini: 'op_mini',
  operamobile: 'op_mob',
  chromeandroid: 'and_chr',
  firefoxandroid: 'and_ff',
  ucandroid: 'and_uc',
  qqandroid: 'and_qq'
}

// Aliases to work with joined versions like `ios_saf 7.0-7.1`
browserslist.versionAliases = { }

// Get browser data by alias or case insensitive name
function byName (name) {
  name = name.toLowerCase()
  name = browserslist.aliases[name] || name
  return browserslist.data[name]
}

// Get browser data by alias or case insensitive name and throw error
// on unknown browser
function checkName (name) {
  var data = byName(name)
  if (!data) throw new BrowserslistError('Unknown browser ' + name)
  return data
}

// Read and parse config
browserslist.readConfig = function (file) {
  if (!isFile(file)) {
    throw new BrowserslistError('Can\'t read ' + file + ' config')
  }
  return browserslist.parseConfig(fs.readFileSync(file))
}

// Find config, read file and parse it
browserslist.findConfig = function (from) {
  if (!path.resolve) return undefined

  from = path.resolve(from)

  var cacheKey = isFile(from) ? path.dirname(from) : from
  if (cacheKey in configCache) {
    return configCache[cacheKey]
  }

  var resolved = eachParent(from, function (dir) {
    var config = path.join(dir, 'browserslist')
    var pkg = path.join(dir, 'package.json')
    var rc = path.join(dir, '.browserslistrc')

    var pkgBrowserslist
    if (isFile(pkg)) {
      try {
        pkgBrowserslist = parsePackage(pkg)
      } catch (e) {
        if (e.name === 'BrowserslistError') throw e
        console.warn('[Browserslist] Could not parse ' + pkg + '. Ignoring it.')
      }
    }

    if (isFile(config) && pkgBrowserslist) {
      throw new BrowserslistError(
        dir + ' contains both browserslist and package.json with browsers')
    } else if (isFile(rc) && pkgBrowserslist) {
      throw new BrowserslistError(
        dir + ' contains both .browserslistrc and package.json with browsers')
    } else if (isFile(config) && isFile(rc)) {
      throw new BrowserslistError(
        dir + ' contains both .browserslistrc and browserslist')
    } else if (isFile(config)) {
      return browserslist.readConfig(config)
    } else if (isFile(rc)) {
      return browserslist.readConfig(rc)
    } else {
      return pkgBrowserslist
    }
  })
  if (!env.BROWSERSLIST_DISABLE_CACHE) {
    configCache[cacheKey] = resolved
  }
  return resolved
}

/**
 * Return browsers market coverage.
 *
 * @param {string[]} browsers Browsers names in Can I Use.
 * @param {string} [country="global"] Which country statistics should be used.
 *
 * @return {number} Total market coverage for all selected browsers.
 *
 * @example
 * browserslist.coverage(browserslist('> 1% in US'), 'US') //=> 83.1
 */
browserslist.coverage = function (browsers, country) {
  if (country && country !== 'global') {
    if (country.length > 2) {
      country = country.toLowerCase()
    } else {
      country = country.toUpperCase()
    }
    loadCountryStatistics(country)
  } else {
    country = 'global'
  }

  return browsers.reduce(function (all, i) {
    var usage = browserslist.usage[country][i]
    if (usage === undefined) {
      usage = browserslist.usage[country][i.replace(/ [\d.]+$/, ' 0')]
    }
    return all + (usage || 0)
  }, 0)
}

// Return array of queries from config content
browserslist.parseConfig = function (string) {
  var result = { defaults: [] }
  var section = 'defaults'

  string.toString()
    .replace(/#[^\n]*/g, '')
    .split(/\n/)
    .map(function (line) {
      return line.trim()
    })
    .filter(function (line) {
      return line !== ''
    })
    .forEach(function (line) {
      if (IS_SECTION.test(line)) {
        section = line.match(IS_SECTION)[1].trim()
        result[section] = result[section] || []
      } else {
        result[section].push(line)
      }
    })

  return result
}

// Clear internal caches
browserslist.clearCaches = function () {
  filenessCache = {}
  configCache = {}
}

var QUERIES = [
  {
    regexp: /^last\s+(\d+)\s+major versions?$/i,
    select: function (context, versions) {
      return Object.keys(agents).reduce(function (selected, name) {
        var data = byName(name)
        if (!data) return selected
        var array = getMajorVersions(data.released, versions)

        array = array.map(nameMapper(data.name))
        return selected.concat(array)
      }, [])
    }
  },
  {
    regexp: /^last\s+(\d+)\s+versions?$/i,
    select: function (context, versions) {
      return Object.keys(agents).reduce(function (selected, name) {
        var data = byName(name)
        if (!data) return selected
        var array = data.released.slice(-versions)

        array = array.map(nameMapper(data.name))
        return selected.concat(array)
      }, [])
    }
  },
  {
    regexp: /^last\s+(\d+)\s+electron\s+major versions?$/i,
    select: function (context, versions) {
      var validVersions = getMajorVersions(Object.keys(e2c).reverse(), versions)
      return validVersions.map(function (i) {
        return 'chrome ' + e2c[i]
      })
    }
  },
  {
    regexp: /^last\s+(\d+)\s+(\w+)\s+major versions?$/i,
    select: function (context, versions, name) {
      var data = checkName(name)
      var validVersions = getMajorVersions(data.released, versions)
      return validVersions.map(nameMapper(data.name))
    }
  },
  {
    regexp: /^last\s+(\d+)\s+electron\s+versions?$/i,
    select: function (context, versions) {
      return Object.keys(e2c).reverse().slice(-versions).map(function (i) {
        return 'chrome ' + e2c[i]
      })
    }
  },
  {
    regexp: /^last\s+(\d+)\s+(\w+)\s+versions?$/i,
    select: function (context, versions, name) {
      var data = checkName(name)
      return data.released.slice(-versions).map(nameMapper(data.name))
    }
  },
  {
    regexp: /^unreleased\s+versions$/i,
    select: function () {
      return Object.keys(agents).reduce(function (selected, name) {
        var data = byName(name)
        if (!data) return selected
        var array = data.versions.filter(function (v) {
          return data.released.indexOf(v) === -1
        })

        array = array.map(nameMapper(data.name))
        return selected.concat(array)
      }, [])
    }
  },
  {
    regexp: /^unreleased\s+electron\s+versions?$/i,
    select: function () {
      return []
    }
  },
  {
    regexp: /^unreleased\s+(\w+)\s+versions?$/i,
    select: function (context, name) {
      var data = checkName(name)
      return data.versions.filter(function (v) {
        return data.released.indexOf(v) === -1
      }).map(nameMapper(data.name))
    }
  },
  {
    regexp: /^since (\d+)(?:-(\d+))?(?:-(\d+))?$/i,
    select: function (context, year, month, date) {
      year = parseInt(year)
      month = parseInt(month || '01') - 1
      date = parseInt(date || '01')
      var since = Date.UTC(year, month, date, 0, 0, 0) / 1000

      return Object.keys(agents).reduce(function (selected, name) {
        var data = byName(name)
        if (!data) return selected
        var versions = Object.keys(data.releaseDate).filter(function (v) {
          return data.releaseDate[v] >= since
        })
        return selected.concat(versions.map(nameMapper(data.name)))
      }, [])
    }
  },
  {
    regexp: /^(>=?)\s*(\d*\.?\d+)%$/,
    select: function (context, sign, popularity) {
      popularity = parseFloat(popularity)
      var usage = browserslist.usage.global

      return Object.keys(usage).reduce(function (result, version) {
        if (sign === '>') {
          if (usage[version] > popularity) {
            result.push(version)
          }
        } else if (usage[version] >= popularity) {
          result.push(version)
        }
        return result
      }, [])
    }
  },
  {
    regexp: /^(>=?)\s*(\d*\.?\d+)%\s+in\s+my\s+stats$/,
    select: function (context, sign, popularity) {
      popularity = parseFloat(popularity)

      if (!context.customUsage) {
        throw new BrowserslistError('Custom usage statistics was not provided')
      }

      var usage = context.customUsage

      return Object.keys(usage).reduce(function (result, version) {
        if (sign === '>') {
          if (usage[version] > popularity) {
            result.push(version)
          }
        } else if (usage[version] >= popularity) {
          result.push(version)
        }
        return result
      }, [])
    }
  },
  {
    regexp: /^(>=?)\s*(\d*\.?\d+)%\s+in\s+((alt-)?\w\w)$/,
    select: function (context, sign, popularity, place) {
      popularity = parseFloat(popularity)

      if (place.length === 2) {
        place = place.toUpperCase()
      } else {
        place = place.toLowerCase()
      }

      loadCountryStatistics(place)
      var usage = browserslist.usage[place]

      return Object.keys(usage).reduce(function (result, version) {
        if (sign === '>') {
          if (usage[version] > popularity) {
            result.push(version)
          }
        } else if (usage[version] >= popularity) {
          result.push(version)
        }
        return result
      }, [])
    }
  },
  {
    regexp: /^electron\s+([\d.]+)\s*-\s*([\d.]+)$/i,
    select: function (context, from, to) {
      if (!e2c[from]) {
        throw new BrowserslistError('Unknown version ' + from + ' of electron')
      }
      if (!e2c[to]) {
        throw new BrowserslistError('Unknown version ' + to + ' of electron')
      }

      from = parseFloat(from)
      to = parseFloat(to)

      return Object.keys(e2c).filter(function (i) {
        var parsed = parseFloat(i)
        return parsed >= from && parsed <= to
      }).map(function (i) {
        return 'chrome ' + e2c[i]
      })
    }
  },
  {
    regexp: /^(\w+)\s+([\d.]+)\s*-\s*([\d.]+)$/i,
    select: function (context, name, from, to) {
      var data = checkName(name)
      from = parseFloat(normalizeVersion(data, from) || from)
      to = parseFloat(normalizeVersion(data, to) || to)

      function filter (v) {
        var parsed = parseFloat(v)
        return parsed >= from && parsed <= to
      }

      return data.released.filter(filter).map(nameMapper(data.name))
    }
  },
  {
    regexp: /^electron\s*(>=?|<=?)\s*([\d.]+)$/i,
    select: function (context, sign, version) {
      return Object.keys(e2c)
        .filter(generateFilter(sign, version))
        .map(function (i) {
          return 'chrome ' + e2c[i]
        })
    }
  },
  {
    regexp: /^(\w+)\s*(>=?|<=?)\s*([\d.]+)$/,
    select: function (context, name, sign, version) {
      var data = checkName(name)
      var alias = browserslist.versionAliases[data.name][version]
      if (alias) {
        version = alias
      }
      return data.released
        .filter(generateFilter(sign, version))
        .map(function (v) {
          return data.name + ' ' + v
        })
    }
  },
  {
    regexp: /^(firefox|ff|fx)\s+esr$/i,
    select: function () {
      return ['firefox 52']
    }
  },
  {
    regexp: /(operamini|op_mini)\s+all/i,
    select: function () {
      return ['op_mini all']
    }
  },
  {
    regexp: /^electron\s+([\d.]+)$/i,
    select: function (context, version) {
      var chrome = e2c[version]
      if (!chrome) {
        throw new BrowserslistError(
          'Unknown version ' + version + ' of electron')
      }
      return ['chrome ' + chrome]
    }
  },
  {
    regexp: /^(\w+)\s+(tp|[\d.]+)$/i,
    select: function (context, name, version) {
      if (/^tp$/i.test(version)) version = 'TP'
      var data = checkName(name)
      var alias = normalizeVersion(data, version)
      if (alias) {
        version = alias
      } else {
        if (version.indexOf('.') === -1) {
          alias = version + '.0'
        } else if (/\.0$/.test(version)) {
          alias = version.replace(/\.0$/, '')
        }
        alias = normalizeVersion(data, alias)
        if (alias) {
          version = alias
        } else {
          throw new BrowserslistError(
            'Unknown version ' + version + ' of ' + name)
        }
      }
      return [data.name + ' ' + version]
    }
  },
  {
    regexp: /^extends (.+)$/i,
    select: function (context, name) {
      if (!context.dangerousExtend) checkExtend(name)
      // eslint-disable-next-line security/detect-non-literal-require
      var queries = require(name)
      if (!Array.isArray(queries)) {
        throw new BrowserslistError(
          '`' + name + '` config exports not an array of queries')
      }
      return resolve(queries, context)
    }
  },
  {
    regexp: /^defaults$/i,
    select: function () {
      return browserslist(browserslist.defaults)
    }
  }
]

var CONFIG_PATTERN = /^browserslist-config-/
var SCOPED_CONFIG__PATTERN = /@[^./]+\/browserslist-config(-|$)/

function checkExtend (name) {
  var use = ' Use `dangerousExtend` option to disable.'
  if (!CONFIG_PATTERN.test(name) && !SCOPED_CONFIG__PATTERN.test(name)) {
    throw new BrowserslistError(
      'Browserslist config needs `browserslist-config-` prefix. ' + use)
  }
  if (name.indexOf('.') !== -1) {
    throw new BrowserslistError(
      '`.` not allowed in Browserslist config name. ' + use)
  }
  if (name.indexOf('node_modules') !== -1) {
    throw new BrowserslistError(
      '`node_modules` not allowed in Browserslist config.' + use)
  }
}

// Get and convert Can I Use data

(function () {
  for (var name in agents) {
    var browser = agents[name]
    browserslist.data[name] = {
      name: name,
      versions: normalize(agents[name].versions),
      released: normalize(agents[name].versions.slice(0, -3)),
      releaseDate: agents[name].release_date
    }
    fillUsage(browserslist.usage.global, name, browser.usage_global)

    browserslist.versionAliases[name] = { }
    for (var i = 0; i < browser.versions.length; i++) {
      var full = browser.versions[i]
      if (!full) continue

      if (full.indexOf('-') !== -1) {
        var interval = full.split('-')
        for (var j = 0; j < interval.length; j++) {
          browserslist.versionAliases[name][interval[j]] = full
        }
      }
    }
  }
}())

module.exports = browserslist
