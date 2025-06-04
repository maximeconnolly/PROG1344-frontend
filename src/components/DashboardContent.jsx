// Page principale de l'application le dashboard

import {Card, Row, Col, Spin} from "antd";

import {
    DollarOutlined,
    UserOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";

import {useSelector} from "react-redux";



const DashboardContent = (props) => {
    const stats = useSelector((state) => state.stats.stats);

    return(
        <>{props.user.status === 'done' ? <>
            <h3>{Math.random() < 1/3 ? 'Velkommen' : 'Welcome'}, {props.user.user}!</h3>
            <Row gutter={[16, 16]}>
                <Col xs={26} sm={14} md={10} lg={8}>
                    <Card title="Total Transaction" style={{textAlign: "center"}}>
                        <DollarOutlined style={{fontSize: "32px", color: "#1890ff"}}/>
                        <p style={{fontSize: "20px", margin: "10px 0"}}>{stats.total_transaction}</p>
                    </Card>
                </Col>
                <Col xs={26} sm={14} md={10} lg={8}>
                    <Card title="Total Games" style={{textAlign: "center"}}>
                        <UserOutlined style={{fontSize: "32px", color: "#52c41a"}}/>
                        <p style={{fontSize: "20px", margin: "10px 0"}}>{stats.total_game}</p>
                    </Card>
                </Col>
                <Col xs={26} sm={14} md={10} lg={8}>
                    <Card title="Total Reviews" style={{textAlign: "center"}}>
                        <ShoppingCartOutlined style={{fontSize: "32px", color: "#faad14"}}/>
                        <p style={{fontSize: "20px", margin: "10px 0"}}>{stats.total_review}</p>
                    </Card>
                </Col>
            </Row>
        </>:<Spin/>}</>
    );
};
export default DashboardContent;