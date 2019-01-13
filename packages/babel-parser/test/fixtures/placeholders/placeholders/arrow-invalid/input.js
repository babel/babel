// %%FOO%% is parsed as an expression, so it isn't a valid
// parameter in parenless arrow functions. It must be used
// as (%%FOO%%) => {};
%%FOO%% => {};