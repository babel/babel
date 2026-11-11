// These parentheses end the optional chain and must be kept
(o?.g)!.h = 1;
(o?.g)!.h;
(o?.f)!();
(o?.f!)();
(o?.f!).g;
(o?.f)!!();
(o?.f)![k];
(o?.f)!<T>();
delete (o?.f)!.g;
(o?.[k])!.g;
(o?.())!.g;
(o?.f.f)!.g;
(o.f?.())!.g;
((o?.f)<T>)();
((o?.f)<T>)!();
((o?.f)<T>)!.g;

// These are a single chain and have no parentheses to keep
o?.f!();
o?.f!.g;
o!.f();
o.f!.g;
(o.f)!();
