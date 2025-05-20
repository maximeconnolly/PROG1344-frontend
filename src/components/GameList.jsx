import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Modal, Form, Input } from 'antd';
//import { addGames, deleteGames, updateGames } from '../store/gameSlice.js';
import {isUserGuest, isUserAdmin} from "../utils/authHelper.js";


const GameList = (props) =>{

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();
    let games = props.games.games;

    let isAdmin = isUserAdmin(props.user)
    let isGuest = isUserGuest(props.user);


    const onDelete = () => {
        // dispatch(deleteGames({
        //     key: selectedId.key
        // }));
        selectedId = null;
        handleCancelGameDeleteModal();
    }

    const onUpdate = (values) => {
        // dispatch(updateGames({
        //     key: values.key,
        //     name: values.name,
        //     platform: values.platform,
        //     year: values.year
        // }))
        console.log(values.key);
        selectedId = null;
        updateForm.resetFields();
        handleCancelGameUpdateModal();
    }

    const columns = [
        {
            title: 'Game Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Release Date',
            dataIndex: 'release_date',
            key: 'release_date',
            filters: [
                {
                    text:1990,
                    value: 1990
                },
                {
                    text: 1998,
                    value: 1998
                },
                {
                    text: 1999,
                    value: 1999
                }
            ],
            onFilter: (value, record) => record.year.indexOf(value) === 0,
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
            filters: [
                {
                    text:"Playstation 2",
                    value: "Playstation 2"
                },
                {
                    text: "Playstation",
                    value: "Playstation"
                },
                {
                    text: "Gamecube",
                    value: "Gamecube"
                }
            ],
            onFilter: (value, record) => record.platform.indexOf(value) === 0,
        },
        {
          title: 'Detail',
          key: 'detail',
          width: 100,
          render: (record) => {return (<Button type="primary" onClick={() => {
              setSelectedId(record);
              console.log(record);
              showGameDetailModal();
          }}>Details</Button>)}
        },
        {
            title: 'Edit',
            key: 'edit',
            width: 100,
            render: (record) => {return (<Button type="primary" disabled={ isGuest } onClick={() => {
                setSelectedId(record);
                showGameUpdateModal();
                updateForm.setFieldsValue({
                    name: record.name,
                    platform: record.platform,
                    year: record.year,
                    key: record.key
                })
            }}>Edit</Button>)}
        },
        {
            title: 'Delete',
            key: 'delete',
            width: 100,
            render: (record) => {return (<Button type="primary" danger disabled={isAdmin || isGuest} onClick={() =>{
                setSelectedId(record);
                showGameDeleteModal();
            }}>Delete</Button>)}
        }
    ];


    const addGame = (values) => {
        const gameName = values.name;
        const gamePlatform = values.platform;
        const gameYear = values.year;

        // dispatch(addGames({
        //     name: gameName,
        //     platform: gamePlatform,
        //     year: gameYear
        // }));
        form.resetFields();
        handleCancelGameAddModal();
    }

    const [isGameAddModalVisible, setIsGameAddModalVisible] = useState(false);
    const [isGameDeleteModalVisible, setIsGameDeleteModalVisible] = useState(false);
    const [isGameUpdateModalVisible, setIsGameUpdateVisible] = useState(false);
    const [isGameDetailModalVisible, setIsGameDetailModalVisible] = useState(false);

    let [selectedId, setSelectedId] = useState(null);

    const showGameUpdateModal = () => {
        setIsGameUpdateVisible(true);
    }

    const handleCancelGameUpdateModal = () => {
        setIsGameUpdateVisible(false);
    }

    const showGameDetailModal = () => {
        setIsGameDetailModalVisible(true);
    }
    const handleCancleGameDetailModal = () => {
        setIsGameDetailModalVisible(false);
    }

    const showGameDeleteModal = () =>{
        setIsGameDeleteModalVisible(true);
    }

    const handleCancelGameDeleteModal = () =>{
        setIsGameDeleteModalVisible(false);
    }

    const showGameAddModal = () => {
        setIsGameAddModalVisible(true);
    }
    const handleCancelGameAddModal = () => {
        setIsGameAddModalVisible(false);
    }

    return (
        <>
            <h3>Game List</h3>
            <Button type="primary" disabled={isGuest} onClick={showGameAddModal}>Add Game to List</Button>
            <Table 
                columns={columns}
                dataSource={games}
                rowKey="id"
                scroll={{
                    x: 'max-content',
                    y: 55*5
                }}
            />
            {/** Add Game Modal */}
            <Modal
                title="Add a game"
                open={isGameAddModalVisible}
                onCancel={handleCancelGameAddModal}
                footer={null}
            >
                <Form name="game-form" layout="vertical" onFinish={addGame} form={form}>
                    <Form.Item
                    label="Game Name"
                    name="name"
                    rules={[{ required: true, message: "Enter a game name!" }]}
                    >
                        <Input />
                    </Form.Item>
        
                    <Form.Item
                        label="Platform"
                        name="platform"
                        rules={[{ required: true, message: "Enter a platform!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Release Date"
                        name="release_date"
                        rules={[{ required: true, message: "Enter a year!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add Game
                    </Button>
                    </Form>
            </Modal>
            {/**Delete game modal */}
            <Modal
                title="Delete a game"
                open={isGameDeleteModalVisible}
                onOk={onDelete}
                onCancel={handleCancelGameDeleteModal}
                okText="Yes"
                cancelText="Cancel"
                okButtonProps={{ danger: true}}
            >
                Confirm deletion of game {selectedId ? selectedId.name : null}
            </Modal>
            {/**Update game modal */}
            <Modal
                title="Update a game"
                open={isGameUpdateModalVisible}
                onCancel={handleCancelGameUpdateModal}
                
                footer={null}
            >
                <Form name="login-form" layout="vertical" onFinish={onUpdate} form={updateForm}>
                    <Form.Item
                        style={{ display: 'none'}}
                        name="key"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                    label="Game Name"
                    name="name"
                    rules={[{ required: true, message: "Enter a game name!" }]}
                    >
                        <Input />
                    </Form.Item>
        
                    <Form.Item
                        label="Platform"
                        name="platform"
                        rules={[{ required: true, message: "Enter a platform!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Year"
                        name="year"
                        rules={[{ required: true, message: "Enter a year!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Update Game
                    </Button>
                    </Form>
            </Modal>
            {/** Game Detail Modal **/}
            <Modal
                open={isGameDetailModalVisible}
                onCancel={handleCancleGameDetailModal}
                title={(selectedId ? selectedId.name : null) + " - Details"}
                footer={null}>
            </Modal>
        </>

    );
};


export default GameList;