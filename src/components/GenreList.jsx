import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Input, Modal, Table} from "antd";
import {createGenre, deleteGenre, getGenre, updateGenre} from "../store/genreSlice.js";
import {Button} from "antd";
import './GameList.css'
import {isUserGuest} from "../utils/authHelper.js";


const GenreList = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();

    let isGuest = isUserGuest(props.user);

    const [isGenreAddModalVisible, setIsGenreAddModalVisible] = useState(false);
    const [isGenreDeleteModalVisible, setIsGenreDeleteModalVisible] = useState(false);
    const [isGenreEditModalVisible, setIsGenreEditModalVisible] = useState(false);


    let [selectedId, setSelectedId] = useState(null);


    let genres = props.genres.genres;

    useEffect(() => {
        dispatch(getGenre());
    }, [dispatch]);

    const columns = [
        {
            title: 'Genre Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Edit',
            key: 'edit',
            width: 100,
            render: (record) => {
                return <Button
                    type="primary"
                    onClick={() => {
                        setSelectedId(record);
                        showGenreUpdateModal()
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
            title: 'Delete',
            key: 'delete',
            width: 100,
            render: (record) => {
                return <Button
                    type="primary"
                    danger
                    onClick={() => {
                        setSelectedId(record);
                        showGenreDeleteModal();
                    }}
                >
                    Delete
                </Button>
            }
        }
    ];

    const showGenreAddModal = () => {
        setIsGenreAddModalVisible(true);
    }

    const handleCancelAddGenreModal = () => {
        setIsGenreAddModalVisible(false);
        form.resetFields();
    }

    const showGenreDeleteModal = () => {
        setIsGenreDeleteModalVisible(true);
    }

    const handleCancelDeleteModal = () => {
        setIsGenreDeleteModalVisible(false);
    }

    const showGenreUpdateModal = () => {
        setIsGenreEditModalVisible(true);
    }

    const handleCancelGenreUpdateModal = () => {
        setIsGenreEditModalVisible(false);
    }

    const addGenre = async (values) => {
        await dispatch(createGenre(values));
        await dispatch(getGenre());
        handleCancelAddGenreModal();
        form.resetFields();
    }

    const onDelete = async () => {
        await dispatch(deleteGenre(selectedId.id)).unwrap();
        dispatch(getGenre());
        selectedId = null;
        handleCancelDeleteModal();
    }

    const onUpdate = async (values) => {
        await dispatch(updateGenre({
            id: values.key,
            name: values.name,
        }));
        selectedId = null;
        updateForm.resetFields();
        await dispatch(getGenre());
        handleCancelGenreUpdateModal();
    }

    return (
        <>
            <h3>Genre List</h3>
            <Button type="primary" className="new-element-button" onClick={showGenreAddModal} disabled={isGuest}>Add New Genre</Button>
            <Table
                columns={columns}
                dataSource={genres}
                rowKey="key"
                scroll={{
                    x: 'max-content',
                    y: 55*5
                }}
            />

            <Modal
                title="Add Genre"
                open={isGenreAddModalVisible}
                onCancel={handleCancelAddGenreModal}
                footer={null}
            >
                <Form name="genre-form" layout="vertical" onFinish={addGenre} form={form}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please the genre name'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type='primary' htmlType="submit" block>
                        Add Genre
                    </Button>
                </Form>
            </Modal>
            <Modal
                title="Delete Genre"
                open={isGenreDeleteModalVisible}
                onCancel={handleCancelDeleteModal}
                onOk={onDelete}
                okText="Yes"
                cancelText="Cancel"
                okButtonProps={{danger: true}}
            >
                Confirm deletion of genre {selectedId ? selectedId.name : null}
            </Modal>
            <Modal
                title="Update Genre"
                open={isGenreEditModalVisible}
                onCancel={handleCancelGenreUpdateModal}
                footer={null}
            >
                <Form name="genre-form" layout="vertical" onFinish={onUpdate} form={updateForm}>
                    <Form.Item
                        style={{display: 'none'}}
                        name="key"
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please the genre name'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type='primary' htmlType="submit" block>
                        Update Genre
                    </Button>
                </Form>
            </Modal>

        </>
    )
};
export default GenreList;

