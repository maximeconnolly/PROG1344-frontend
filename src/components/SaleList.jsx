import React, { useState } from "react";
import {
    Button,
    Form,
    Table,
    Modal,
    Input,
    Select,
    InputNumber,
    DatePicker,
} from 'antd';
import { useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import { convertTransactionEnum } from "../utils/enumHelper.js";
import {createSales, getSales, updateSales} from "../store/salesSlice.js";
import dayjs from 'dayjs';

const SaleList = (props) => {
    const dispatch = useDispatch();

    const sales = props.sales.sales;
    const games = props.games.games;

    const [isGameSaleAddModalVisible, setIsGameSaleAddModalVisible] = useState(false);
    const [isGameSaleUpdateModalVisible, setIsGameSaleUpdateModalVisible] = useState(false);
    const [isGameSaleDeleteModalVisible, setIsGameSaleDeleteModalVisible] = useState(false);

    let [selectedId, setSelectedId] = useState(null);

    const [addForm] = Form.useForm();
    const [updateForm] = Form.useForm();

    const getGameName = (gameId) => {
        return games.find((g) => g.id === gameId)?.name;
    };

    const columns = [
        {
            title: 'Game Name',
            dataIndex: 'game',
            key: 'gameName',
            render: (gameId) => getGameName(gameId),
        },
        {
            title: 'Transaction Type',
            dataIndex: 'type',
            key: 'transactionType',
            render: (type) => convertTransactionEnum(type),
        },
        {
            title: 'Transaction Amount',
            dataIndex: 'amount',
            key: 'transactionAmount',
        },
        {
            title: 'Transaction Date',
            dataIndex: 'date',
            key: 'transactionDate',
        },
        {
            title: 'Edit',
            key: 'edit',
            width: 100,
            render: (record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedId(record);
                        showGameUpdateSaleModal();
                        updateForm.setFieldsValue({
                            key: record.id,
                            game: record.game,
                            type: record.type,
                            amount: record.amount,
                            date: dayjs(record.date),
                        });
                    }}
                >
                    Edit
                </Button>
            ),
        },
    ];

    const showGameAddSaleModal = () => setIsGameSaleAddModalVisible(true);
    const showGameUpdateSaleModal = () => setIsGameSaleUpdateModalVisible(true);
    const handleCancelAddSaleModal = () => setIsGameSaleAddModalVisible(false);
    const handleCancelUpdateSaleModal = () => setIsGameSaleUpdateModalVisible(false);
    const handleCancelDeleteSaleModal = () => setIsGameSaleDeleteModalVisible(false);

    const onUpdate = async (values) => {
        let transaction_date = values.date.format("YYYY-MM-DD");
        await dispatch(updateSales({
            id: values.key,
            date: transaction_date,
            type: values.type,
            amount: values.amount,
            game: values.game,
        }));
        selectedId = null;
        updateForm.resetFields();
        await dispatch(getSales());
        handleCancelUpdateSaleModal();
    };

    const onAdd = async (values) => {
        let transaction_date = values.date.format("YYYY-MM-DD");
        await dispatch(createSales({
            type: values.type,
            game: values.game,
            date: transaction_date,
            amount: values.amount,
        }));
        addForm.resetFields();
        handleCancelAddSaleModal();
    };

    return (
        <>
            <h3>Transaction List</h3>
            <Button type="primary" onClick={showGameAddSaleModal}>
                Add new Transaction
            </Button>
            <br />
            <br />
            <Button type="primary">
                <CSVLink data={sales} filename={"Export-" + new Date() + ".csv"}>
                    Download CSV
                </CSVLink>
            </Button>

            <Table
                columns={columns}
                dataSource={sales}
                scroll={{
                    x: 'max-content',
                    y: 55 * 5,
                }}
            />

            {/* Add Game Modal */}
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
                        name="type"
                        rules={[{ required: true, message: "Enter a Transaction Type!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={[
                                { value: 1, label: "Buy" },
                                { value: 2, label: "Sell" },
                                { value: 3, label: "Loan" },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Game"
                        name="game"
                        rules={[{ required: true, message: "Enter a game!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={games.map((game) => ({
                                value: game.id,
                                label: game.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Transaction Amount"
                        name="amount"
                        rules={[{ required: true, message: "Enter a Transaction Amount!" }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Transaction Date"
                        name="date"
                        rules={[{ required: true, message: "Enter a Transaction Date!" }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add Transaction
                    </Button>
                </Form>
            </Modal>

            {/* Delete Game Modal */}
            <Modal
                title="Delete a transaction"
                open={isGameSaleDeleteModalVisible}
                onOk={() => {} /* implement onDelete */}
                onCancel={handleCancelDeleteSaleModal}
                okText="Yes"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                Confirm deletion of transaction{" "}
                {selectedId ? `${selectedId.gameName} ${selectedId.transactionAmount}` : null}
            </Modal>

            {/* Update Game Modal */}
            <Modal
                title="Update a rental"
                open={isGameSaleUpdateModalVisible}
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
                        style={{display: 'none'}}
                        name="key"
                    >
                        <Input />

                    </Form.Item>
                    <Form.Item
                        label="Transaction Type"
                        name="type"
                        rules={[{ required: true, message: "Enter a Transaction Type!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={[
                                { value: 1, label: "Buy" },
                                { value: 2, label: "Sell" },
                                { value: 3, label: "Loan" },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Game"
                        name="game"
                        rules={[{ required: true, message: "Enter a game!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={games.map((game) => ({
                                value: game.id,
                                label: game.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Transaction Amount"
                        name="amount"
                        rules={[{ required: true, message: "Enter a Transaction Amount!" }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Transaction Date"
                        name="date"
                        rules={[{ required: true, message: "Enter a Transaction Date!" }]}
                    >
                        <DatePicker />
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