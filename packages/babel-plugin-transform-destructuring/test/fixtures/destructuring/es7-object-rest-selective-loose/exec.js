const useState = () => (["state", "dispatch"]);

var [state, dispatch] = useState();

expect(state).toBe("state");
expect(dispatch).toBe("dispatch");
