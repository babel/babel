expect(switch ("foo") { 
  case "foo", "bar" => true;
  case "baz" => { return 77 };
}).toBe(true);
