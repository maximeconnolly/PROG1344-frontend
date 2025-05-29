import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import {Button, Form, Input, Modal, Table} from "antd";
import {createSeries, deleteSeries, getSeries, updateSeries} from "../store/seriesSlice.js";
import './GameList.css';
import {isUserGuest} from "../utils/authHelper.js";

const SeriesList = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();

    let isGuest = isUserGuest(props.user);

    const [isSeriesAddModalVisible, setIsSeriesAddModalVisible] = useState(false);
    const [isSeriesEditModalVisible, setIsSeriesEditModalVisible] = useState(false);
    const [isSeriesDeleteModalVisible, setIsSeriesDeleteModalVisible] = useState(false);

    let [selectedId, setSelectedId] = useState(null);

    let series = props.series.series;

    useEffect(() => {
        dispatch(getSeries());
    }, [dispatch]);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Edit",
            key: "edit",
            width: 100,
            render: (record) => {
                return <Button
                    type="primary"
                    onClick={() => {
                        setSelectedId(record.id);
                        showSeriesUpdateModal();
                        updateForm.setFieldsValue({
                            key: record.id,
                            name: record.name,
                        })
                    }}
                >
                    Edit
                </Button>
            }
        },
        {
            title: "Delete",
            key: "delete",
            width: 100,
            render: (record) => {
                return <Button
                type="primary"
                danger
                onClick={() => {
                    setSelectedId(record);
                    showSeriesDeleteModal()
                }
                }
                >
                    Delete
                </Button>
            }
        }
    ];

    const showSeriesAddModal= () => {
        setIsSeriesAddModalVisible(true);
    }
    const handleCancelAddSeriesModal = () => {
        setIsSeriesAddModalVisible(false);
    }

    const showSeriesUpdateModal = () => {
        setIsSeriesEditModalVisible(true);
    }

    const handleCancelEditSeriesModal = () => {
        setIsSeriesEditModalVisible(false);
    }

    const showSeriesDeleteModal = () => {
        setIsSeriesDeleteModalVisible(true);
    }

    const handleCancelDeleteSeriesModal = () => {
        setIsSeriesDeleteModalVisible(false);
    }

    const addSeries = async (values) => {
        await dispatch(createSeries(values));
        await dispatch(getSeries());
        handleCancelAddSeriesModal();
    }

    const onDelete = async (values) => {
        await dispatch(deleteSeries(selectedId.id)).unwrap();
        await dispatch(getSeries());
        selectedId = null;
        handleCancelDeleteSeriesModal();
    }

    const onUpdate = async (values) => {
        await dispatch(updateSeries({
            id: values.key,
            name: values.name,
        }));
        selectedId = null;
        updateForm.resetFields();
        await dispatch(getSeries());
        handleCancelEditSeriesModal();
    }

    return (
        <>
            <h3>Series List</h3>
            <Button type="primary" className="new-element-button" onClick={showSeriesAddModal} disabled={isGuest}>Add New Series</Button>
            <Table
                columns={columns}
                dataSource={series}
                rowKey="key"
                scroll={{ x: 'max-content', y: 55*5 }}
            />

            <Modal
                title="Add Series"
                open={isSeriesAddModalVisible}
                onCancel={handleCancelAddSeriesModal}
                footer={null}
            >
                <Form name="genre-form" layout="vertical" onFinish={addSeries} form={form}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter a name" }]}>
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" htmlType="submit" block>
                        Add Series
                    </Button>
                </Form>
            </Modal>
            <Modal
                title="Update Series"
                open={isSeriesEditModalVisible}
                onCancel={handleCancelEditSeriesModal}
                footer={null}
            >
                <Form
                    name="update-form"
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
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter a name" }]}>
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block >
                        Update Series
                    </Button>
                </Form>
            </Modal>
            <Modal
                title="Delete Series"
                open={isSeriesDeleteModalVisible}
                onCancel={handleCancelDeleteSeriesModal}
                onOk={onDelete}
                okText="Yes"
                cancelText="Cancel"
                okButtonProps={{danger: true}}
            >
                Confirm deletion of series {selectedId ? selectedId.name : null}
            </Modal>
        </>
    )
};

export default SeriesList;