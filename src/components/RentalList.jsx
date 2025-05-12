import React, { useState } from 'react';
import{ Button, Form, Table, Modal, Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {addRentals, deleteRentals, updateRentals} from '../store/rentalSlice';

const RentalList = () => {

    const dispatch = useDispatch();
    const rentals = useSelector((state) => state.rentals.rentals)
    const [isGameRentalAddModalVisible, setIsGameRentalAddModalVisible] =  useState(false);
    const [isGameRentalUpdateModalVisible, setIsGameRentalUpdateModalVisible] = useState(false);
    const [isGameRentalDeleteModalVisible, setIsGameRentalDeleteModalVisible] = useState(false);
    let [selectedId, setSelectedId] = useState(null);

    const [addForm] = Form.useForm();
    const [updateForm] = Form.useForm();

    const authenticatedUser = useSelector((state) => state.auth.user.username);

    let isGuest = false;
    let isAdmin = false;
  
    if(authenticatedUser === 'Guest'){
      isGuest = true;
    }

    if (authenticatedUser === 'Admin'){
        isAdmin = true;
    }


    const columns = [
        {
            title: 'Game Name',
            dataIndex: 'gameName',
            key: 'gameName',
        },
        {
            title: 'Client Name',
            dataIndex: 'clientName',
            key: 'clientName',
        },
        {
            title: 'Return Date',
            dataIndex: 'returnDate',
            key: 'returnDate'
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
        dispatch(updateRentals({
            key: values.key,
            gameName: values.gameName,
            clientName: values.clientName,
            returnDate: values.returnDate
        }))
        console.log(values.key)
        selectedId = null;
        updateForm.resetFields();
        handleCancelUpdateRentalModal();
    }
    const onDelete = () => {
        dispatch(deleteRentals({
            key: selectedId.key
        }));
        selectedId = null;
        handleCancelDeleteRentalModal();
    }

    const onAdd = (values) => {
        dispatch(addRentals({
            gameName: values.gameName,
            clientName: values.clientName,
            returnDate: values.returnDate
        }))
        addForm.resetFields();
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
                    label="Game Name"
                    name="gameName"
                    rules={[{ required: true, message: "Enter a game name!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Client Name"
                        name="clientName"
                        rules={[{ required: true, message: "Enter a platform!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Return Date"
                        name="returnDate"
                        rules={[{ required: true, message: "Enter a year!" }]}
                    >
                        <Input />
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