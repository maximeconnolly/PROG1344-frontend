import React, { useState } from 'react';
import {Button, Form, Table, Modal, Input, Select, DatePicker, InputNumber} from 'antd';
import { useDispatch } from 'react-redux';
import {isUserGuest, isUserAdmin} from "../utils/authHelper.js";
import {deleteRental, getRental, updateRental, createRental} from "../store/rentalSlice.js";
import dayjs from 'dayjs';

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
                    key: record.id,
                    game: record.game,
                    client: record.client,
                    start_time: dayjs(record.start_time),
                    end_time: dayjs(record.end_time),
                    price: record.price,

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

    const onUpdate = async (values) =>{

        let start_time = values.start_time.format("YYYY-MM-DD");
        let end_time = values.end_time.format("YYYY-MM-DD");
        await dispatch(updateRental({
            id: values.key,
            game: values.game,
            client: values.client,
            start_time: start_time,
            end_time: end_time,
            price: values.price,
        }));
        selectedId = null;
        updateForm.resetFields();
        await dispatch(getRental());
        handleCancelUpdateRentalModal();
    }
    const onDelete = async () => {
        await dispatch(deleteRental(selectedId.id)).unwrap();
        dispatch(getRental());
        selectedId = null;
        handleCancelDeleteRentalModal();
    }

    const onAdd = async (values) => {

        let start_time = values.start_time.format("YYYY-MM-DD");
        let end_time = values.end_time.format("YYYY-MM-DD");

        await dispatch(createRental({
            game: values.game,
            client: values.client,
            price: values.price,
            start_time: start_time,
            end_time: end_time,
        }))
        addForm.setFieldsValue({});
        handleCancelAddRentalModal();
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
                Confirm deletion of rental {selectedId ? getGameName(selectedId.game) + " " + selectedId.end_time : null}
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
                        style={{display: 'none'}}
                        name="key"
                    >
                        <Input />
                    </Form.Item>
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
                        Update Rental
                    </Button>
                </Form>
            </Modal>
        </>
    )
}

export default RentalList;