/**
 * Contient la barre menu sur le coter
 */
import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import { Layout, Menu} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHandHoldingHand, faGamepad, faSackDollar } from "@fortawesome/free-solid-svg-icons";

import DashboardContent from "./DashboardContent";
import CopywriteFooter from "./CopywriteFooter";
import GameList from "./GameList";
import RentalList from "./RentalList";
import SettingList from "./SettingList"
import SaleList from "./SaleList";
import {logout} from "../store/authSlice.js";
import {getUser} from "../store/userSlice.js";

const {Header, Content, Footer, Sider} = Layout;



const Dashboard = () => {
  // const authenticatedUser = useSelector((state) => state.auth.user.username)
  const dispatch = useDispatch();


  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  console.log(user);
  let isAdmin = false;
  let isSuperUser = false;

  if (user.group.includes('admin')) {
    isAdmin = true;
  }

  if (user.group.includes('superuser')) {
    isSuperUser = true;
  }


  // if(authenticatedUser === 'Admin'){
  //   isAdmin = true;
  // } else if (authenticatedUser === 'SuperUser'){
  //   isSuperUser = true;
  // }

  // Fonction qui s'occupe du click du menu
  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
  }

  let content;
  // Switch case pour change la page
  if (selectedItem === null || selectedItem === '1'){
    content = <DashboardContent />;
  } else if (selectedItem === '2') {
    content = <GameList />;
  } else if (selectedItem === '3') {
    content = <RentalList />;
  } else if (selectedItem === '4'){
    content = <SaleList />;

  } else if (selectedItem === '5') {
    content = <SettingList />;
  }else if (selectedItem === '6'){
    dispatch(logout());
  };

  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} trigger={null}>
        <div className="logo" style={{ color: "#fff", textAlign: "center", padding: "16px" }}>
          {collapsed ? "" : "Dashboard"}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} selectedKeys={[selectedItem]} onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<FontAwesomeIcon icon={faGamepad} />}>
            Games
          </Menu.Item>
          {(isAdmin || isSuperUser) ? 
          <Menu.Item key="3" icon={<FontAwesomeIcon icon={faHandHoldingHand}/>} >
            Rental
          </Menu.Item> : <></>
          }
          {(isAdmin || isSuperUser) ? 
          <Menu.Item key="4" icon={<FontAwesomeIcon icon={faSackDollar} />} >
            Sales
          </Menu.Item> : <></>
          }

          {isSuperUser ? (          
          <Menu.Item key="5" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>): <></>};
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Layout */}
      <Layout style={{height: "100vh"}}>
        <Header style={{ padding: "0 16px", background: "#fff", display: "flex", alignItems: "center" }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
            style: { fontSize: "18px", cursor: "pointer" },
          })}
          <h2 style={{ marginLeft: "16px" }}>Dashboard</h2>
        </Header>
        <Content style={{ margin: "16px", padding: "16px", background: "#fff" }}>
          {content}
        </Content>
        <Footer><CopywriteFooter /></Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;