import { Routes, Route } from "react-router";
import { router } from "common/router";

function RoutesComponent() {
  return <Routes>
      {Object.keys(router).map(routerKey => {
      const route = router[routerKey];

      if (route && route.element) {
        const {
          path,
          element: Component
        } = route;
        // Component should not be hoisted
        return <Route key={routerKey} path={path} element={<Component />} />;
      } else {
        return null;
      }
    }).filter(Boolean)}
    </Routes>;
}
