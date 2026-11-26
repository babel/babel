import { a } from "a";

// `g()` might reassign `a`, so it must be read before calling it.
const result = a |> (g(), %);
