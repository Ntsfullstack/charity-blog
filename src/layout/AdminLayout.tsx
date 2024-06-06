import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/auth/components/Sider"; // Corrected spelling

const { Header, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} /> {/* Added basic styling */}
        <Content style={{ margin: "16px" }}>
          <Outlet /> {/* Ensure Outlet is used to render child routes */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
