const keys = []
function a() {
  for (const key of keys) {}
}

const b = () => {
  for (const key of keys) {}
}

const c = () => {
  const d = () => {
    for (const key of keys) {}
  }
}
