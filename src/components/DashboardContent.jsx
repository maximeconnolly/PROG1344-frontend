/**
 * Page principale de l'application le dashboard
 */
import React, {useEffect} from "react";
import {Card, Row, Col } from "antd";

import {
    DollarOutlined,
    UserOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";

import {useDispatch, useSelector} from "react-redux";

import { logout} from "../store/authSlice.js";
import {getUser} from "../store/userSlice.js";

const DashboardContent = () => {
   // const user = useSelector((state) => state.auth.user.username);
    const stats = useSelector((state) => state.dashboard.stats);
    const dispatch = useDispatch();
    const { user, status, error} = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return(
        <>
            <h3>Welcome {user}!</h3>
            <button onClick={() => dispatch(logout())}>Logout</button>
            <Row gutter={[16, 16]}>
                <Col xs={26} sm={14} md={10} lg={8}>
                    <Card title="Sales" style={{textAlign: "center"}}>
                        <DollarOutlined style={{fontSize: "32px", color: "#1890ff"}}/>
                        <p style={{fontSize: "20px", margin: "10px 0"}}>{stats.revenue}$</p>
                    </Card>
                </Col>
                <Col xs={26} sm={14} md={10} lg={8}>
                    <Card title="Total Games" style={{textAlign: "center"}}>
                        <UserOutlined style={{fontSize: "32px", color: "#52c41a"}}/>
                        <p style={{fontSize: "20px", margin: "10px 0"}}>{stats.gameInCollection}</p>
                    </Card>
                </Col>
                <Col xs={26} sm={14} md={10} lg={8}>
                    <Card title="Reviews" style={{textAlign: "center"}}>
                        <ShoppingCartOutlined style={{fontSize: "32px", color: "#faad14"}}/>
                        <p style={{fontSize: "20px", margin: "10px 0"}}>{stats.reviews}</p>
                    </Card>
                </Col>

            </Row>
        </>
    );
};
export default DashboardContent;