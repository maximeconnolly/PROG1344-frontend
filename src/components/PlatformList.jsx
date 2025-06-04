import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Form, Input, Modal, Table, Button} from "antd";
import {createPlatform, deletePlatform, getPlatforms, updatePlatform} from "../store/platformSlice.js";
import "./Lists.css";
import {isUserGuest} from "../utils/authHelper.js";

const PlatformList = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();

    let isGuest = isUserGuest(props.user);

    const [isPlatformAddModalVisible, setIsPlatformAddModalVisible] = useState(false);
    const [isPlatformDeleteModalVisible, setIsPlatformDeleteModalVisible] = useState(false);
    const [isPlatformEditModalVisible, setIsPlatformEditModalVisible] = useState(false);

    let [selectedId, setSelectedId] = useState(null);

    let platforms = props.platforms.platforms;

    useEffect(() => {
        dispatch(getPlatforms());
    }, [dispatch]);

    const columns = [
        {
            title: 'Platform Name',
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
                        showPlatformUpdateModal();
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
                        showPlatformDeleteModal();
                    }}
                >
                    Delete
                </Button>
            }
        }
    ];

    const showPlatformAddModal = () => {
        setIsPlatformAddModalVisible(true);
    };

    const handleCancelAddPlatformModal = () => {
        setIsPlatformAddModalVisible(false);
    };

    const showPlatformUpdateModal = () => {
        setIsPlatformEditModalVisible(true);
    };

    const handleCancelPlaformUpdateModal = () => {
        setIsPlatformEditModalVisible(false);
    };

    const showPlatformDeleteModal = () => {
        setIsPlatformDeleteModalVisible(true);
    };

    const handleCancelDeletePlatformModal = () => {
        setIsPlatformDeleteModalVisible(false);
    };

    const addPlatform = async (values) => {
        await dispatch(createPlatform(values));
        await dispatch(getPlatforms());
        handleCancelAddPlatformModal();
        form.resetFields();
    }

    const onDelete = async () => {
        await dispatch(deletePlatform(selectedId.id)).unwrap();
        await dispatch(getPlatforms());
        selectedId = null;
        handleCancelDeletePlatformModal();
    }

    const onUpdate = async (values) => {
        await dispatch(updatePlatform({
            id: values.key,
            name: values.name,
        }));
        selectedId = null;
        updateForm.resetFields();
        await dispatch(getPlatforms());
        handleCancelPlaformUpdateModal();
    }

    return (
        <>
            <h3>Platform List</h3>
            <Button type="primary" className="new-element-button" onClick={showPlatformAddModal} disabled={isGuest}>Add New Platform</Button>
            <Table
                columns={columns}
                dataSource={platforms}
                rowKey="key"
                scroll={{x: 'max-content', y: 55*5}}
            />
            <Modal
                title="Add Platform"
                open={isPlatformAddModalVisible}
                onCancel={handleCancelAddPlatformModal}
                footer={null}
            >
                <Form name="platform-form" layout="vertical" onFinish={addPlatform} form={form}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Platform name is required'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block >
                        Add Platform
                    </Button>
                </Form>
            </Modal>
            <Modal
                title="Delete Platform"
                open={isPlatformDeleteModalVisible}
                onCancel={handleCancelDeletePlatformModal}
                onOk={onDelete}
                okText="Yes"
                cancelText="Cancel"
                okButtonProps={{danger: true}}
            >
                Confirm deletion of platform {selectedId? selectedId.name : null}
            </Modal>
            <Modal
                title="Update Platform"
                open={isPlatformEditModalVisible}
                onCancel={handleCancelPlaformUpdateModal}
                footer={null}
            >
                <Form
                    name="platform-form"
                    layout="vertical"
                    onFinish={onUpdate}
                    form={updateForm}
                >
                    <Form.Item
                        style={{display: 'none'}}
                        name="key"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please the genre name'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Button type='primary' htmlType="submit" block>
                        Update Platform
                    </Button>
                </Form>
            </Modal>
        </>
    )
}
export default PlatformList;