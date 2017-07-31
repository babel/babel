class A { 
  @methDec @methDec2 method() {
    console.log("method executed");
  } 
  
  @methDec static estatic() {
    console.log("estatic executed");
  }
}

function methDec(descriptor) {
  console.log("methDec executed", arguments); 
  return {descriptor, extras: [], finishers: []}
}

function methDec2(descriptor) {
  console.log("methDec2 executed", arguments); 
  return {descriptor, extras: [], finishers: []}
}

function classDec(constructor, heritage, memberDescriptors) {
  console.log("class executed", arguments); 
  return {constructor, elements: memberDescriptors, finishers: []}
}
