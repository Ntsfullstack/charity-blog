import React, { ReactNode } from "react";
import { Layout, Menu } from "antd";
import collapsedLogo from "../../../../assets/images/collapsedLogo.png";
import expandedLogo from "../../../../assets/images/expandedLogo.png";
import style from "./Sider.module.scss";

import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux-setup/redux";

const { Sider } = Layout;

type MenuItem = {
  label: string;
  key: string;
  icon: ReactNode;
};

const items: MenuItem[] = [
  {
    label: "Manager Blog",
    key: "/auth/manager-blog",
    icon: <HomeOutlined />,
  },
  {
    label: "Create Blog",
    key: "/auth/create-blog",
    icon: <TagOutlined />,
  },
  {
    label: "Edit Banner",
    key: "/auth/settings",
    icon: <SettingOutlined />,
  },
  {
    label: "Logout",
    key: "/logout",
    icon: <LogoutOutlined />,
  },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "/logout") {
      dispatch(logout());
      navigate("/login");
      return;
    }
    navigate(key);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <Link to="/" className={style.demo_logo_vertical}>
        <img
          src={collapsed ? collapsedLogo : expandedLogo}
          alt="logo"
          className={style.logo}
        />
      </Link>
      <Menu
        theme="dark"
        selectedKeys={[location.pathname]}
        mode="inline"
        items={items.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
        }))}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default Sidebar;
