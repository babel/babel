# StringAlter.js
Alters a string by replacing multiple range fragments in one fast pass.
Works in node and browsers.



## Usage
```javascript
    var StringAlter = require("string-alter");

    var string =
        'let x = (a, b, c = 998) =>'
        + 'a + b + c;console.log(x(1, 1) === 1000)'
        + '\n'
        + 'console.log(((function(){return (a)=>a*22.032})())("321") === "321"*22.032)'
    ;

    var alter = new StringAlter(string);
    alter
        .replace(0, 3, "var")//'let'
        .insert(8, "function")//'function ' + "(a, b"
        .remove(13, 22)//', c = 998'
        .remove(23, 26)//' =>'
        .wrap(26, 35, "{", "}", {extend: true})
        .insert(26,
            "var " + alter.get(15, 16) + " = arguments[2];"		 //var c = arguments[2];
            + "if(" + alter.get(15, 16) + " === void 0)"		 //if(c === void 0)
            + alter.get(15, 16) + " = " + alter.get(19, 22) + ";"//c = 998;
        )
        .insert(26, "return ")//'return ' + "a + b + c;"
        .insert(98, "function")//'function ' + "(a)"
        .remove(101, 103)//'=>'
        .wrap(103, 111, "{", "}", {extend: true})
        .insert(103, "return ")//'return ' + "a*22.032"
    ;
    var result = alter.apply();
    result ===
        'var x = function(a, b)'
        + '{var c = arguments[2];if(c === void 0)c = 998;return a + b + c};console.log(x(1, 1) === 1000)'
        + '\n'
        + 'console.log(((function(){return function(a){return a*22.032}})())("321") === "321"*22.032)'
    ;

```

The fragments does not need to be sorted but must not overlap. More examples in `test`

## API
```javascript
var alter = new StringAlter(source: string, options: Object?);
// options is optional. See 'StringAlter options'
```

```javascript
alter.replace(from: number, to: number, str: string): StringAlter
```
Replace substring from between "from" and "to" positions to given one "str"

```javascript
alter.insert(pos: number, str: string): StringAlter
```
Insert substring to "pos" position

```javascript
alter.wrap(from: number, to: number, begin: string, end: string): StringAlter
```
Insert "begin" string to "from" position and "end" string to "to" position

```javascript
alter.remove(from: number, to: number): StringAlter
```
Remove substring

```javascript
alter.get(from: number, to: number): Object
```
Get substring from original string wrapped in special object with toString function

```javascript
alter.apply(): string
```
Apply changes. Return result string

## StringAlter options
```javascript
{
	policy: {}// see 'Changes policy'
}
```

### Changes policy
```javascript
{
	"ruleName": resolve//resolve should be "allow" or "exclude", or any other value which will be interpreted as "error"
}
```
This is a set of rules that can `allow` or `exclude` some unobvious changes

 * `fromMoreThanTo` (default: 'error') - when changes start position is is larger than end position
 * `unUniqueRemove` (default: 'error') - second `remove` call for already removed fragment (with the same method parameter values)
 * `eraseInErase` (default: 'allow') - `remove` or `replace` inside another `remove` or `replace`


## Installation

### Node
Install using npm

    npm install string-alter

```javascript
var StringAlter = require("string-alter");
```

### Browser

Clone the repo and include it in a script tag

    git clone https://github.com/termi/StringAlter.git

```html
<script src="StringAlter/dist/StringAlter.js"></script>
```

## LICENSE

MIT
