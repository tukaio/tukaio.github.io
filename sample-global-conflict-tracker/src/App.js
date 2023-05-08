import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute";
import routes from "./routes";

function App() {
  return (
    <Routes>
      {routes.map((route, index) => {
        const { component: Component, id, path, ...rest } = route;
        if (route["private"]) {
          return (
            <Route key={index} path={path} element={<PrivateRoute element={<Component />} />} exact={true} {...rest} />
          );
        } else {
          return <Route key={index} path={path} element={<Component />} exact={true} {...rest} />;
        }
      })}
    </Routes>
  );
}

export default App;
