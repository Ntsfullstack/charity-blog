import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/auth/components/Sider"; // Corrected spelling
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const { Header, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />{" "}
        <Content style={{ margin: "16px", overflow: "hidden" }}>
          <Outlet /> {/* Ensure Outlet is used to render child routes */}
        </Content>
      </Layout>
      <ToastContainer />
    </Layout>
  );
};

export default AdminLayout;
