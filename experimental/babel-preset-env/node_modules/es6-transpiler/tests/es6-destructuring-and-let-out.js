var index = 0, tests = [];

{var a = ++index;}
{var a$0 = ++index;var a1 = ({a1: a$0}).a1;(function(expect){ tests.push(function(){ console.log(a$0 === expect && a1 === expect) }) })(index)}
{var a$1 = ++index;var a1$0 = ({a1: a$1}).a1;
(function(expect){ tests.push(function(){ console.log(a$1 === expect && a1$0 === expect) }) })(index)
}
{var a$2 = ++index;var a1$1 = ({a1: a$2}).a1;
(function(expect){ tests.push(function(){ console.log(a$2 === expect && a1$1 === expect) }) })(index)}
{var a$3 = ++index;var a1$2 = ({a1: a$3}).a1;;(function(expect){ tests.push(function(){ console.log(a$3 === expect && a1$2 === expect) }) })(index)}
{var a$4 = ++index;var a1$3 = ({a1: a$4}).a1;(function(expect){ tests.push(function(){ console.log(a$4 === expect && a1$3 === expect) }) })(index)}
{var a$5 = ++index;var a1$4 = ({a1: a$5}).a1;(function(expect){ tests.push(function(){ console.log(a$5 === expect && a1$4 === expect) }) })(index)}
{var a$6 = ++index;var a1$5 = ({a1: a$6}).a1;(function(expect){ tests.push(function(){ console.log(a$6 === expect && a1$5 === expect) }) })(index);}
{var a$7 = ++index;var a1$6 = ({a1: a$7}).a1;(function(expect){ tests.push(function(){ console.log(a$7 === expect && a1$6 === expect) }) })(index);a$7}
{var a$8 = ++index;var a1$7 = ({a1: a$8}).a1;(function(expect){ tests.push(function(){ console.log(a$8 === expect && a1$7 === expect) }) })(index)}

tests.forEach(function(fuc){ fuc() })
