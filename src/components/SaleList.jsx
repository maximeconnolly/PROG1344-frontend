import React, {useState} from "react";
import {Button, Form, Table, Modal, Input} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addSales, updateSales } from "../store/salesSlice";
import { CSVLink } from "react-csv";

const SaleList = () => {
    const dispatch = useDispatch();
    const sales = useSelector((state) => state.sales.sales)
    const [isGameSaleAddModalVisible, setIsGameSaleAddModalVisible] = useState(false);
    const [isGameSaleUpdateModalVisibile, setIsGameSaleUpdateModalVisible] = useState(false);
    const [isGameSaleDeleteModalVisibile, setIsGameSaleDeleteModalVisible] = useState(false);

    let [selectedId, setSelectedId] = useState(null);

    const [addForm] = Form.useForm();
    const [updateForm] = Form.useForm();


    const columns = [
        {
            title: 'Game Name',
            dataIndex: 'gameName',
            key: 'gameName'
        },
        {
            title: 'Transaction Type',
            dataIndex: 'transactionType',
            key: 'transactionType'
        },
        {
            title: 'Transaction Amount',
            dataIndex: 'transactionAmount',
            key: 'transactionAmount'
        },
        {
            title: 'Transaction Date',
            dataIndex: 'transactionDate',
            key: 'transactionDate'
        },
        {
            title: 'Edit',
            key: 'edit',
            width: 100,
            render: (record) => {return (<Button type="primary" onClick={() => {
                setSelectedId(record);
                showGameUpdateSaleModal();
                updateForm.setFieldsValue({
                    key: record.key,
                    transactionAmount: record.transactionAmount,
                    transactionDate: record.transactionDate,
                    transactionType: record.transactionType,
                    gameName: record.gameName
                });
            }}>Edit</Button>)}
        }

    ];

    const showGameAddSaleModal = () => {
        setIsGameSaleAddModalVisible(true);
    }

    const showGameUpdateSaleModal = () => {
        setIsGameSaleUpdateModalVisible(true);
    }

    // const showGameDeleteSaleModal = () => {
    //     setIsGameSaleDeleteModalVisible(true);
    // }

    const handleCancelAddSaleModal = () => {
        setIsGameSaleAddModalVisible(false);
    }

    const handleCancelUpdateSaleModal = () => {
        setIsGameSaleUpdateModalVisible(false);
    }

    const handleCancelDeleteSaleModal = () => {
        setIsGameSaleDeleteModalVisible(false);
    }

    const onUpdate = (values) => {
        dispatch(updateSales({
            transactionType: values.transactionType,
            transactionAmount: values.transactionAmount,
            transactionDate: values.transactionDate,
            gameName: values.gameName,
            key: values.key
        }))
        selectedId = null;
        updateForm.resetFields();
        handleCancelUpdateSaleModal();
    }

    const onDelete = () =>{

    }

    const onAdd = (values) => {
        dispatch(addSales({
            transactionType: values.transactionType,
            transactionAmount: values.transactionAmount,
            gameName: values.gameName,
            transactionDate: values.transactionDate
        }));
        addForm.resetFields();
        handleCancelAddSaleModal();
    }

    return (
        <>
            <h3>Transaction List</h3>
            <Button type="primary" onClick={showGameAddSaleModal}>Add new Transaction</Button>
            <br/ >
            <br/ >
            <Button type="primary">
            {/**CVS Download link */}
            <CSVLink 
                data={sales}
                filename={"Export-"+ new Date() + ".csv"}
            >
                Download CSV
            </CSVLink>
            </Button>

            <Table 
                columns={columns}
                dataSource={sales}
                scroll={{
                    x: 'max-content',
                    y: 55*5
                }}
            />
            {/**Add Game Modal */}
            <Modal
                title="Add a transaction"
                open={isGameSaleAddModalVisible}
                onCancel={handleCancelAddSaleModal}
                footer={null}
            >
                <Form 
                    name="sale-add-form"
                    layout="vertical"
                    onFinish={onAdd}
                    form={addForm}
                >
                    <Form.Item
                        label="Transaction Type"
                        name="transactionType"
                        rules={[{ required: true, message: "Enter a Transaction Type!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Transaction Amount"
                        name="transactionAmount"
                        rules={[{ required: true, message: "Enter a Transaction Amount!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Game Name"
                        name="gameName"
                        rules={[{ required: true, message: "Enter a game name!" }]}
                    >
                        <Input />   
                    </Form.Item>
                    <Form.Item
                        label="Transaction Date"
                        name="transactionDate"
                        rules={[{ required: true, message: "Enter a game name!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add Transaction
                    </Button>
                </Form>

            </Modal>
            {/**Delete game modal */}
            <Modal
                title="Delete a transaction"
                open={isGameSaleDeleteModalVisibile}
                onOk={onDelete}
                onCancel={handleCancelDeleteSaleModal}
                okText="Yes"
                cancelText="Cancel"
                okButtonProps={{ danger: true}}
            >
                Confirm deletetion of transaction {selectedId ? selectedId.gameName + " " + selectedId.transactionAmount : null}
            </Modal>
            {/**Update game modal */}
            <Modal
                title="Update a rental"
                open={isGameSaleUpdateModalVisibile}
                onCancel={handleCancelUpdateSaleModal}
                footer={null}
            >
                <Form 
                    name="sale-update-form"
                    layout="vertical"
                    onFinish={onUpdate}
                    form={updateForm}
                >
                    <Form.Item
                        label="Transaction Type"
                        name="transactionType"
                        rules={[{ required: true, message: "Enter a Transaction Type!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Transaction Amount"
                        name="transactionAmount"
                        rules={[{ required: true, message: "Enter a Transaction Amount!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Game Name"
                        name="gameName"
                        rules={[{ required: true, message: "Enter a game name!" }]}
                    >
                        <Input />   
                    </Form.Item>
                    <Form.Item
                        label="Transaction Date"
                        name="transactionDate"
                        rules={[{ required: true, message: "Enter a game name!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        style={{display: 'none'}}
                        name="key"
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Update Transaction
                    </Button>
                </Form>
            </Modal>
        </>

);
};

export default SaleList;