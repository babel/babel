import React from "react";
import OtherComponent from "./components/other-component";

export default function App() {
  return (
    <div>
      <LazyComponent />
      <OtherComponent />
    </div>
  );
}

const LazyComponent = React.lazy(() => import("./components/lazy-component"));
