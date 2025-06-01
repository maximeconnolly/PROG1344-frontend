import React, { useState } from 'react';
import {Button, Form, Table, Modal, Input, Select, DatePicker, InputNumber} from 'antd';
import { useDispatch } from 'react-redux';
import {isUserGuest, isUserAdmin} from "../utils/authHelper.js";

const RentalList = (props) => {

    const dispatch = useDispatch();
    const rentals = props.rentals.rentals;
    const games = props.games.games;
    const clients = props.clients.clients;
    const [isGameRentalAddModalVisible, setIsGameRentalAddModalVisible] =  useState(false);
    const [isGameRentalUpdateModalVisible, setIsGameRentalUpdateModalVisible] = useState(false);
    const [isGameRentalDeleteModalVisible, setIsGameRentalDeleteModalVisible] = useState(false);
    let [selectedId, setSelectedId] = useState(null);

    const [addForm] = Form.useForm();
    const [updateForm] = Form.useForm();

    let isGuest = isUserGuest(props.user);
    let isAdmin = isUserAdmin(props.user);


    const columns = [
        {
            title: 'Game Name',
            dataIndex: 'game',
            key: 'game',
            render: (record) => {
                return getGameName(record);
            }
        },
        {
            title: 'Client Name',
            dataIndex: 'clientName',
            key: 'clientName',
            render: (record) => {
                return getClientName(record);
            }
        },
        {
            title: 'Start Date',
            dataIndex: 'start_time',
            key: 'start_time',
        },
        {
            title: 'Return Date',
            dataIndex: 'end_time',
            key: 'end_time'
        },
        {
            title: 'Edit',
            key: 'edit',
            width: 100,
            render: (record) => {return (<Button type="primary" disabled={isGuest} onClick={() => {
                setSelectedId(record);
                showGameUpdateRentalModal();
                updateForm.setFieldsValue({
                    gameName: record.gameName,
                    clientName: record.clientName,
                    returnDate: record.returnDate,
                    key: record.key
                })
            }}>Edit</Button>)}
        },
        {
            title: 'Delete',
            key: 'delete',
            width: 100,
            render: (record) => {
                return (<Button type="primary" danger disabled={isGuest || isAdmin} onClick={() => {
                    setSelectedId(record);
                    showGameDeleteRentalModal();
                }}>Delete</Button>)
            } 
        }
    ];


    const getClientName = (client) => {
        let clientName = clients.find(obj => obj.name === client)?.first_name + " " + clients.find(obj => obj.name === client)?.last_name;

        return clientName;
    };

    const getGameName = (game) => {
        return games.find(obj => obj.id === game)?.name
    }

    const showGameAddRentalModal = () => {
        setIsGameRentalAddModalVisible(true);
    }
    const showGameUpdateRentalModal = () => {
        setIsGameRentalUpdateModalVisible(true);
    }
    const showGameDeleteRentalModal = () => {
        setIsGameRentalDeleteModalVisible(true);
    }

    const handleCancelAddRentalModal = () => {
        setIsGameRentalAddModalVisible(false);
    }

    const handleCancelUpdateRentalModal = () => {
        setIsGameRentalUpdateModalVisible(false);
    }

    const handleCancelDeleteRentalModal = () => {
        setIsGameRentalDeleteModalVisible(false);
    }

    const onUpdate = (values) =>{

    }
    const onDelete = () => {

    }

    const onAdd = (values) => {

    }
    return (
        <>
            <h3>Game Rental List</h3>
            <Button type="primary" onClick={showGameAddRentalModal}>Add Game Rental</Button>
            <Table 
                columns={columns}
                dataSource={rentals}
                scroll={{
                    x: 'max-content',
                    y: 55*5
                }}
            />
            {/**Game Add Modal */}
            <Modal
                title="Add a game rental"
                open={isGameRentalAddModalVisible}
                onCancel={handleCancelAddRentalModal}
                footer={null}
            >
                <Form name="rental-add-form" layout="vertical" onFinish={onAdd} form={addForm}>
                    <Form.Item
                    label="Game"
                    name="game"
                    rules={[{ required: true, message: "Enter a game!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={(games || []).map(game => ({
                                value: game.id,
                                label: game.name,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Client"
                        name="client"
                        rules={[{ required: true, message: "Enter a client!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={(clients || []).map(client => ({
                                value: client.id,
                                label: client.first_name + " " + client.last_name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Start Date"
                        name="start_time"
                        rules={[{ required: true, message: "Enter a start date!" }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Return Date"
                        name="end_time"
                        rules={[{ required: true, message: "Enter a return date!" }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Enter a price!" }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add Rental
                    </Button>
                    </Form>
        </Modal>
        {/**Delete Game Modal */}
            <Modal
                title="Delete a rental"
                open={isGameRentalDeleteModalVisible}
                onOk={onDelete}
                onCancel={handleCancelDeleteRentalModal}
                okText="Yes"
                cancelText="Cancel"
                okButtonProps={{ danger: true}}
            >
                Confirm deletion of rental {selectedId ? selectedId.gameName + " " + selectedId.returnDate : null}
            </Modal>
            {/**Update Game Modal */}
            <Modal
                title="Update a rental"
                open={isGameRentalUpdateModalVisible}
                onCancel={handleCancelUpdateRentalModal}
                footer={null}
            >
                <Form name="rental-form-update" layout='vertical' onFinish={onUpdate} form={updateForm}>
                    <Form.Item
                        style={{ display: 'none'}}
                        name="key"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Game Name"
                        name="gameName"
                        rules={[{ required: true, message: "Enter a game name!"}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Client Name"
                        name="clientName"
                        rules={[{ required: true, message: "Enter a client name!"}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Return Date"
                        name="returnDate"
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType='submit' block>
                        Update Game
                    </Button>
                </Form>
            </Modal>
        </>
    )
}

export default RentalList;