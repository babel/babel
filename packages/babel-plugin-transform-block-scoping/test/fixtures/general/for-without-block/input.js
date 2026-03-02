function proxyObserver(component) {
  for (let key in component.properties)
    if (component.properties[key].observer) {
      let base = component.properties[key].observer;
      component.properties[key].observer = () => {
        base.apply(this);
      };
    }

  return component;
}

function proxyObserver2(component) {
  for (let key of component.properties)
    while (1) {
      let base = component.properties[key].observer;
      component.properties[key].observer = () => {
        base.apply(this);
      };
    }

  return component;
}
