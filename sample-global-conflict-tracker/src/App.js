import { DesktopOutlined, FileOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute";
import routes from "./routes";
const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "app.mapTracking",
    icon: <DesktopOutlined />,
    label: "Tất cả điểm nóng",
    path: "/map-tracking/list",
  },
  {
    key: "app.about",
    icon: <FileOutlined />,
    label: "About",
    path: "/about",
  },
];

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
