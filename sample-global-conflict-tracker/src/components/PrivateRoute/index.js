import { DesktopOutlined, FileOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const modules = {
  HOME: "home",
  MAP_TRACKING: "map-tracking",
  ABOUT: "about",
};

export function PrivateRoute(props) {
  const { element } = props;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      key: "app.home",
      icon: <HomeOutlined />,
      label: "Trang chủ",
      path: "/",
    },
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

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div style={{ height: 32, margin: 16, background: "rgba(255, 255, 255, 0.2)" }} />
          <Menu
            theme="dark"
            defaultSelectedKeys={[modules.MAP_TRACKING]}
            mode="inline"
            items={items}
            onClick={(e) => {
              const menu = items.find((i) => i.key === e.key);
              if (menu) {
                const path = menu.path;
                navigate(path);
              }
              console.log("e ", e);
            }}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <div style={{ padding: 24, minHeight: 360 }}>{element}</div>
          </Content>
          <Footer style={{ textAlign: "center" }}>©2023 Created by congtuuit</Footer>
        </Layout>
      </Layout>
    </>
  );
}
