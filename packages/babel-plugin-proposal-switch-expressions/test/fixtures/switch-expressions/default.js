expect(switch ("xyzzy") { 
  case "foo" => true;
  case "bar" => false;
  default => 77;
}).toBe(77);
