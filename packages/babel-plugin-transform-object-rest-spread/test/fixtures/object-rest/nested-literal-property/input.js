let useState = [{ some: 42 }, () => null];

let {
  0: { numeric,...rest1 },
  '2': { str,...rest2 },
  1: setState,
} = useState;
