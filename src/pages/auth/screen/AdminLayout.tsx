import React, { ReactNode, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content, Sider } = Layout;

interface MenuItem {
  label: React.ReactNode;
  key: React.Key;
  children?: MenuItem[];
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[]
): MenuItem {
  return {
    label,
    key,
    children,
  };
}

const items: MenuItem[] = [
  getItem("Option 1", "1"),
  getItem("Option 2", "2"),
  getItem("User", "sub1", [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", [getItem("Team 1", "6"), getItem("Team 2", "8")]),
  getItem("Files", "9"),
];

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value: boolean) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          {children}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
