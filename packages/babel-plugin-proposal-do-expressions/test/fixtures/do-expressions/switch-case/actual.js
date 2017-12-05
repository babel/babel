const x = () => do {
  switch (new Date().getDay()) {
    case 0: case 6: "weekend 🚵"; break
    default: "weekday 🚴"
  }
}
