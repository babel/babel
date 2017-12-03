let index = 0, tests = [];

{let a = ++index;}
{let a = ++index;let {a1}={a1: a};(function(expect){ tests.push(function(){ console.log(a === expect && a1 === expect) }) })(index)}
{let a = ++index;let {a1}={a1: a};
(function(expect){ tests.push(function(){ console.log(a === expect && a1 === expect) }) })(index)
}
{let a = ++index;let {a1}={a1: a};
(function(expect){ tests.push(function(){ console.log(a === expect && a1 === expect) }) })(index)}
{let a = ++index;let {a1}={a1: a};;(function(expect){ tests.push(function(){ console.log(a === expect && a1 === expect) }) })(index)}
{let a = ++index;let {a1}={a1: a};(function(expect){ tests.push(function(){ console.log(a === expect && a1 === expect) }) })(index)}
{let a = ++index;let {a1}={a1: a};(function(expect){ tests.push(function(){ console.log(a === expect && a1 === expect) }) })(index)}
{let a = ++index;let {a1}={a1: a};(function(expect){ tests.push(function(){ console.log(a === expect && a1 === expect) }) })(index);}
{let a = ++index;let {a1}={a1: a};(function(expect){ tests.push(function(){ console.log(a === expect && a1 === expect) }) })(index);a}
{let a = ++index;let {a1}={a1: a};(function(expect){ tests.push(function(){ console.log(a === expect && a1 === expect) }) })(index)}

tests.forEach(function(fuc){ fuc() })
