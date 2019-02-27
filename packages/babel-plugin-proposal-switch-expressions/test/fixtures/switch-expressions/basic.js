expect(switch ("foo") { 
  case "foo" => true;
  case "bar" => false;
  case "baz" => { return 77 };
}).toBe(true);
