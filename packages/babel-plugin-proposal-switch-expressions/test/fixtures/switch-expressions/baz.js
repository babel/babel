expect(switch ("baz") { 
  case "foo", "bar" => true;
  case "baz" => { return 77 };
}).toBe(77);
