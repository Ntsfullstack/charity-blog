import { Layout, Menu, MenuProps } from "antd";
import React from "react";
import collapsedLogo from "../../../../assets/images/collapsedLogo.png";
import expandedLogo from "../../../../assets/images/expandedLogo.png";
import style from "./Sider.module.scss";

import {
  BookOutlined,
  EditOutlined,
  FileImageOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../../redux-setup/redux";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    label: "Quản lý bài viết",
    key: "/auth/manager-blog",
    icon: <HomeOutlined />,
  },
  {
    label: "Quản lý người dùng",
    key: "/auth/manager-user",
    icon: <UserOutlined />,
  },
  {
    label: "Tạo bài viết",
    key: "/auth/create-blog",
    icon: <TagOutlined />,
  },
  {
    label: "Sửa banner",
    key: "/auth/settings",
    icon: <SettingOutlined />,
  },
  {
    label: " Album",
    key: "1",
    icon: <FileImageOutlined />,
    children: [
      { key: '/auth/add-album', label: 'Thêm Album', 
        icon: <BookOutlined />
      },
      { key: '/auth/album', label: 'Quản lý Album', 
        icon: <EditOutlined />
      },
    ],
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
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default Sidebar;
