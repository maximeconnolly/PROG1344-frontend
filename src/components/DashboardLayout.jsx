// Contient la barre menu sur le côté

import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import {Layout, Menu} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHandHoldingHand, faGamepad, faSackDollar} from "@fortawesome/free-solid-svg-icons";

import DashboardContent from "./DashboardContent";
import CopywriteFooter from "./CopywriteFooter";
import GameList from "./GameList";
import RentalList from "./RentalList";
import SettingList from "./SettingList"
import GenreList from "./GenreList";
import SeriesList from "./SeriesList";
import PlatformList from "./PlatformList";
import ClientList from './ClientList.jsx'
import SaleList from "./SaleList";
import {logout} from "../store/authSlice.js";
import {getUser} from "../store/userSlice.js";
import {getGameCompanies} from "../store/gameCompanySlice.js";
import {getPlatforms} from "../store/platformSlice.js";
import {isUserSuperUser, isUserAdmin} from "../utils/authHelper.js";
import {getGames} from "../store/gameSlice.js";
import {getGenre} from "../store/genreSlice.js";
import {getSeries} from "../store/seriesSlice.js";
import {getStats} from "../store/statsSlice.js";
import {getClients} from "../store/clientSlice.js";
import {getRental} from "../store/rentalSlice.js";
import {getSales} from "../store/salesSlice.js";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const Dashboard = () => {
  // const authenticatedUser = useSelector((state) => state.auth.user.username)
  const dispatch = useDispatch();


  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const user = useSelector((state) => state.user);
  const games = useSelector(state => state.games)
  const gamesCompanies = useSelector((state) => state.gameCompanies);
  const platforms = useSelector(state => state.platforms);
  const genres = useSelector(state => state.genres);
  const series = useSelector(state => state.series);
  const stats = useSelector(state => state.stats);
  const clients = useSelector(state => state.clients);
  const rentals = useSelector(state => state.rentals);
  const sales = useSelector(state => state.sales);

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRental());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGameCompanies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSeries());
  }, [dispatch]);
  
  let isAdmin = isUserAdmin(user);
  let isSuperUser = isUserSuperUser(user);



  // Fonction qui s'occupe du click du menu
  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
  }

  let content;
  // Switch case pour changer la page
  if (selectedItem === null || selectedItem === '1'){
    content = <DashboardContent stats={stats} user={user}/>;
  }
  else if (selectedItem === '2-1'){
    content = <GameList
        series={series}
        genres={genres}
        gameCompanies={gamesCompanies}
        user={user}
        games={games}
        platforms={platforms}
    />;
  }
  else if (selectedItem === '2-2'){
      content = <GenreList
        genres={genres}
        user={user}
      />;
  }
  else if (selectedItem === '2-3'){
    content = <SeriesList
        series={series}
        user={user}
    />;
  }
  else if (selectedItem === '2-4'){
    content = <PlatformList
        platforms={platforms}
        user={user}
    />;
  }
  else if (selectedItem === '3-1'){
    content = <RentalList user={user} rentals={rentals} games={games} clients={clients}/>;
  }
  else if (selectedItem === '3-2'){
    content = <ClientList user={user} clients={clients}/>;
  }
  else if (selectedItem === '4'){
    content = <SaleList user={user} games={games} sales={sales}/>;

  }
  else if (selectedItem === '5'){
    content = <SettingList user={user}/>;
  }
  else if (selectedItem === '6'){
    dispatch(logout());
  }

  
  return (
    <Layout style={{minHeight:"100vh"}}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} trigger={null}>
        <div className="logo" style={{color:"#fff", textAlign:"center", padding:"16px"}}>
          {collapsed ? "" : "Dashboard"}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} selectedKeys={[selectedItem]} onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<HomeOutlined/>}>
            Home
          </Menu.Item>
          <SubMenu key="2" title="Games" icon={<FontAwesomeIcon icon={faGamepad}/>}>
            <Menu.Item key="2-1">Game List</Menu.Item>
            <Menu.Item key="2-2">Genre List</Menu.Item>
            <Menu.Item key="2-3">Series List</Menu.Item>
            <Menu.Item key="2-4">Platform List</Menu.Item>
          </SubMenu>
          {(isAdmin || isSuperUser) ?
          <SubMenu key="3" title="Rental" icon={<FontAwesomeIcon icon={faHandHoldingHand}/>}>
            <Menu.Item key="3-1">Rental List</Menu.Item>
            <Menu.Item key="3-2">Client List</Menu.Item>
          </SubMenu>:<></>
          }
          {(isAdmin || isSuperUser) ?
          <Menu.Item key="4" icon={<FontAwesomeIcon icon={faSackDollar}/>}>
            Sales
          </Menu.Item>:<></>
          }
          {(isSuperUser) ?
          <Menu.Item key="5" icon={<SettingOutlined/>}>
            Settings
          </Menu.Item>:<></>
          }
          <Menu.Item key="6" icon={<LogoutOutlined/>}>
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
        <Footer><CopywriteFooter/></Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
