function proxyObserver(properties) {
  for (let key in properties)
    if (properties[key].observer) {
      let base = properties[key].observer;
      properties[key].observer = () => {
        return base.apply(this);
      };
    }

  return properties;
}

const results = proxyObserver([
  { observer: () => 1 },
  { observer: () => 2 },
])
expect(results[0].observer()).toBe(1)
expect(results[1].observer()).toBe(2)
