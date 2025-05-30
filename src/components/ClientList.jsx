import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Form, Input, Modal, Table, Button} from 'antd';
import {createClient, updateClient, getClients, deleteClient} from "../store/clientSlice.js";
import "./GameList.css";
import {isUserGuest} from '../utils/authHelper.js'

const ClientList = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();

    let isGuest = isUserGuest(props.user);

    const [isClientAddModalVisible, setIsClientAddModalVisible] = useState(false);
    const [isClientDeleteModalVisible, setIsClientDeleteModalVisible] = useState(false);
    const [isClientEditModalVisible, setIsClientEditModalVisible] = useState(false);

    let [selectedId, setSelectedId] = useState(null);

    let clients = props.clients.clients;

    useEffect(() =>{
        dispatch(getClients());
    },[dispatch])

    const columns = [
        {
            title: 'Client First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Client Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Phone Number',
            dataIndex: 'telephone',
            key: 'telephone',
        },
        {
            title: 'Edit',
            key: 'edit',
            width: 100,
            render: (record) => {
                return <Button
                    type="primary"
                    onClick={()=>{
                        setSelectedId(record.id);
                        showClientUpdateModal();
                        updateForm.setFieldsValue({
                            key: record.id,
                            first_name: record.first_name,
                            last_name: record.last_name,
                            telephone: record.telephone,
                        })
                    }}
                >
                    Edit
                </Button>
            }
        },
        {
            title: 'Delete',
            key: 'delete',
            width: 100,
            render: (record) => {
                return <Button
                type="primary"
                danger
                onClick={()=>{
                    setSelectedId(record);
                    showClientDeleteModal();
                }}>
                    Delete
                </Button>
            }
        }
    ];

    const showClientAddModal = () => {
        setIsClientAddModalVisible(true);
    }

    const handleCancelAddClientModal = () => {
        setIsClientAddModalVisible(false);
    }

    const showClientUpdateModal = () => {
        setIsClientEditModalVisible(true);
    }
    const handleCancelEditClientModal = () => {
        setIsClientEditModalVisible(false);
    }

    const showClientDeleteModal = () => {
        setIsClientDeleteModalVisible(true);
    }

    const handleCancelDeleteClientModal = () => {
        setIsClientDeleteModalVisible(false);
    }

    const addClient = async (values) => {
        await dispatch(createClient(values));
        await dispatch(getClients());
        handleCancelAddClientModal();
        form.resetFields();
    }

    const onDelete = async() => {
        await dispatch(deleteClient(selectedId.id));
        await dispatch(getClients());
        selectedId = null;
        handleCancelDeleteClientModal();
    }

    const onUpdate = async(values) => {
        await dispatch(updateClient({
            id: values.key,
            first_name: values.first_name,
            last_name: values.last_name,
            telephone: values.telephone,
        }));
        selectedId = null;
        updateForm.resetFields();
        await dispatch(getClients());
        handleCancelEditClientModal();
    }

    return (
        <>
            <h3>Client List</h3>
            <Button type="primary" className="new-element-button" onClick={showClientAddModal} disabled={isGuest}>Add New Client</Button>
            <Table
                columns={columns}
                dataSource={clients}
                rowKey="key"
                scroll={{x: 'max-content', y: 55*5}}>

            </Table>

            <Modal
            title="Add Client"
            open={isClientAddModalVisible}
            onCancel={handleCancelAddClientModal}
            footer={null}
            >
                <Form name="client-form" layout="vertical" onFinish={addClient} form={form}>
                    <Form.Item
                        name="first_name"
                        label="First Name"
                        rules={[{required:true, message: 'First Name is required'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[{required:true, message: 'Last Name is required'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="telephone"
                        label="Telephone"
                        rules={[{required:true, message: 'Telephone is required'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add New Client
                    </Button>
                </Form>
            </Modal>
            <Modal
                title="Delete Client"
                open={isClientDeleteModalVisible}
                onCancel={handleCancelDeleteClientModal}
                onOk={onDelete}
                okText="Yes"
                cancelText="Cancel"
                okButtonProps={{danger: true}}>
                    Confirm deletion of Client {selectedId ? selectedId.first_name + " " + selectedId.last_name : null}
            </Modal>
            <Modal
                title="Update Client"
                open={isClientEditModalVisible}
                onCancel={handleCancelEditClientModal}
                footer={null}
            >
                <Form name="client-form" layout="vertical" onFinish={onUpdate} form={updateForm}>
                    <Form.Item
                        style={{display: 'none'}}
                        name="key"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="first_name"
                        label="First Name"
                        rules={[{required:true, message: 'First Name is required'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[{required:true, message: 'Last Name is required'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="telephone"
                        label="Telephone"
                        rules={[{required:true, message: 'Telephone is required'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Update Client
                    </Button>
                </Form>
            </Modal>
        </>
    )

}

export default ClientList;