function func({
  [(effects.push(1), 'key')]: x
} = (effects.push(2), value)) {}
const arrow = ({
  [(effects.push(1), 'key')]: x
} = (effects.push(2), value)) => {};
