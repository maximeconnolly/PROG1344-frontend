import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Table, Modal, Form, Input, List, Select, DatePicker} from 'antd';
import './Lists.css'
import {getGames, createGame, deleteGame, updateGame} from '../store/gameSlice.js';
import {isUserGuest, isUserAdmin} from "../utils/authHelper.js";
import {convertRegionEnum, convertConditionEnum, convertStockEnum} from "../utils/enumHelper.js";
import dayjs from 'dayjs';


const GameList = (props) =>{

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();

    let games = props.games.games;
    let isAdmin = isUserAdmin(props.user);
    let isGuest = isUserGuest(props.user);
    let platforms = props.platforms.platforms;
    let genres = props.genres.genres;
    let series = props.series.series;
    let gameCompanies = props.gameCompanies.gameCompanies;

    useEffect(() => {
        dispatch(getGames());
    }, [dispatch]);


    const onDelete = async () => {
        await dispatch(deleteGame(selectedId.id)).unwrap();
        dispatch(getGames());
        selectedId = null;
        handleCancelGameDeleteModal();
    }

    const onUpdate = async (values) => {
        let release_date = values.release_date.format("YYYY-MM-DD");
        await dispatch(updateGame({
            id: values.key,
            name: values.name,
            publisher: values.publisher,
            developer: values.developer,
            series: values.series,
            acquisition_price: values.acquisition_price,
            stock_status: values.stock_status,
            platform: values.platform,
            shelf: values.shelf,
            genre: values.genre,
            release_date: release_date,
            conditions: values.conditions,
            region: values.region,
            value: values.value,
        }))
        selectedId = null;
        updateForm.resetFields();
        await dispatch(getGames());
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
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
            render: (record) => {
                return(getPlatformName(record))
            },
        },
        {
          title: 'Detail',
          key: 'detail',
          width: 100,
          render: (record) => {return (<Button type="primary" onClick={() => {
              setSelectedId(record);

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
                    key: record.id,
                    name: record.name,
                    publisher: record.publisher,
                    developer: record.developer,
                    series: record.series,
                    acquisition_price: record.acquisition_price,
                    stock_status: record.stock_status,
                    platform: record.platform,
                    shelf: record.shelf,
                    genre: record.genre,
                    release_date: dayjs(record.release_date),
                    conditions: record.conditions,
                    region: record.region,
                    value: record.value,
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


    const addGame = async (values) => {
        let release_date = values.release_date.format("YYYY-MM-DD");
        await dispatch(createGame({
            name: values.name,
            publisher: values.publisher,
            developer: values.developer,
            series: values.series,
            acquisition_price: values.acquisition_price,
            stock_status: values.stock_status,
            platform: values.platform,
            shelf: values.shelf,
            genre: values.genre,
            release_date: release_date,
            conditions: values.conditions,
            region: values.region,
            value: values.value,
        }));
        await dispatch(getGames());
        handleCancelGameAddModal();
    }

    const [isGameAddModalVisible, setIsGameAddModalVisible] = useState(false);
    const [isGameDeleteModalVisible, setIsGameDeleteModalVisible] = useState(false);
    const [isGameUpdateModalVisible, setIsGameUpdateVisible] = useState(false);
    const [isGameDetailModalVisible, setIsGameDetailModalVisible] = useState(false);

    let [selectedId, setSelectedId] = useState(null);



    const getPlatformName = (platform) => {
        return platforms.find(obj => obj.id === platform)?.name || null;
    }

    const getCompanyName = (publisher) => {
        return gameCompanies.find(obj => obj.id === publisher)?.name || null;
    }

    const getSeriesName = (serie) => {
        if (serie == null) {
            return null;
        }
        return series.find(obj => obj.id === serie)?.name || null;
    }

    const getGenreName = (genre) => {
        return genres.find(obj => obj.id === genre)?.name || null;
    }

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
        form.resetFields();
    }

    return (
        <>
            <h3>Game List</h3>
            <Button type="primary" className="new-element-button" disabled={isGuest} onClick={showGameAddModal}>Add Game to List</Button>
            <Table 
                columns={columns}
                dataSource={[...games]}
                rowKey="key"
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
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Publisher"
                        name="publisher"
                        rules={[{ required: true, message: "Enter a publisher!" }]}
                    >
                        <Select
                            mode="multiple"
                            showSearch
                            optionFilterProp="label"
                            options={(gameCompanies || []).map(gameCompanie => ({
                                value: gameCompanie.id,
                                label: gameCompanie.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Developer"
                        name="developer"
                        rules={[{ required: true, message: "Enter a developer!" }]}
                    >
                        <Select
                            mode="multiple"
                            showSearch
                            optionFilterProp="label"
                            options={(gameCompanies || []).map(gameCompanie => ({
                                value: gameCompanie.id,
                                label: gameCompanie.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Series"
                        name="series"
                        rules={[{ required: true, message: "Enter a series!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={(series || []).map(series => ({
                                value: series.id,
                                label: series.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Acquisition Price"
                        name="acquisition_price"
                        rules={[{ required: true, message: "Enter a acquisition price!" }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Stock Status"
                        name="stock_status"
                        rules={[{ required: true, message: "Enter a stock status!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={[
                                {value: '1', label: 'In Stock'},
                                {value: '2', label: 'Out of Stock'},
                                {value: '3', label:'On Loan'}
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Platform"
                        name="platform"
                        rules={[{ required: true, message: "Enter a platform!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={(platforms || []).map(platform => ({
                                value: platform.id,
                                label: platform.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Value"
                        name="value"
                        rules={[{ required: true, message: "Enter a value!" }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Shelf"
                        name="shelf"
                        rules={[{ required: true, message: "Enter a Shelf!" }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Genre"
                        name="genre"
                        rules={[{ required: true, message: "Enter a genre!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={(genres || []).map(genre => ({
                                value: genre.id,
                                label: genre.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Release Date"
                        name="release_date"
                        rules={[{ required: true, message: "Enter a release date!" }]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        label="Condition"
                        name="conditions"
                        rules={[{ required: true, message: "Enter a conditions!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={[
                                {value: 1, label:"Sealed" },
                                {value:2, label:"Complete In Box"},
                                {value:3, label: "Loose"}
                            ]}

                        />
                    </Form.Item>
                    <Form.Item
                        label="Region"
                        name="region"
                        rules={[{ required: true, message: "Enter a region!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={[
                                {value:1, label: "USA"},
                                {value:2, label:"Europe"},
                                {value:3, label: "Japan"},
                                {value:4, label: "Other"}
                            ]}
                        />
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
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Game Name"
                        name="name"
                        rules={[{ required: true, message: "Enter a game name!" }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Publisher"
                        name="publisher"
                        rules={[{ required: true, message: "Enter a publisher!" }]}
                    >
                        <Select
                            mode="multiple"
                            showSearch
                            optionFilterProp="label"
                            options={(gameCompanies || []).map(gameCompanie => ({
                                value: gameCompanie.id,
                                label: gameCompanie.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Developer"
                        name="developer"
                        rules={[{ required: true, message: "Enter a developer!" }]}
                    >
                        <Select
                            mode="multiple"
                            showSearch
                            optionFilterProp="label"
                            options={(gameCompanies || []).map(gameCompanie => ({
                                value: gameCompanie.id,
                                label: gameCompanie.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Series"
                        name="series"
                        rules={[{ required: true, message: "Enter a series!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={(series || []).map(series => ({
                                value: series.id,
                                label: series.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Acquisition Price"
                        name="acquisition_price"
                        rules={[{ required: true, message: "Enter a acquisition price!" }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Stock Status"
                        name="stock_status"
                        rules={[{ required: true, message: "Enter a stock status!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={[
                                {value: '1', label: 'In Stock'},
                                {value: '2', label: 'Out of Stock'},
                                {value: '3', label:'On Loan'}
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Platform"
                        name="platform"
                        rules={[{ required: true, message: "Enter a platform!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={(platforms || []).map(platform => ({
                                value: platform.id,
                                label: platform.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Value"
                        name="value"
                        rules={[{ required: true, message: "Enter a value!" }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Shelf"
                        name="shelf"
                        rules={[{ required: true, message: "Enter a Shelf!" }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Genre"
                        name="genre"
                        rules={[{ required: true, message: "Enter a genre!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={(genres || []).map(genre => ({
                                value: genre.id,
                                label: genre.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Release Date"
                        name="release_date"
                        rules={[{ required: true, message: "Enter a release date!" }]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        label="Condition"
                        name="conditions"
                        rules={[{ required: true, message: "Enter a conditions!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={[
                                {value: 1, label:"Sealed" },
                                {value:2, label:"Complete In Box"},
                                {value:3, label: "Loose"}
                            ]}

                        />
                    </Form.Item>
                    <Form.Item
                        label="Region"
                        name="region"
                        rules={[{ required: true, message: "Enter a region!" }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={[
                                {value:1, label: "USA"},
                                {value:2, label:"Europe"},
                                {value:3, label: "Japan"},
                                {value:4, label: "Other"}
                            ]}
                        />
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
                    <List
                        header={null}
                        footer={null}
                        bordered
                    >
                        <List.Item>
                            Name: {selectedId ? selectedId.name : null}
                        </List.Item>
                        <List.Item>
                            Condition: {selectedId ? convertConditionEnum(selectedId.conditions) : null}
                        </List.Item>
                        <List.Item>
                            Acquisition Price: {selectedId ? selectedId.acquisition_price + "$": null}
                        </List.Item>
                        <List.Item>
                            Developer: {selectedId ? selectedId.developer.map(obj => getCompanyName(obj)).join(" ") : null}
                        </List.Item>
                        <List.Item>
                            Publisher: {selectedId ? selectedId.publisher.map(obj => getCompanyName(obj)).join(" ") : null}
                        </List.Item>
                        <List.Item>
                            {selectedId && selectedId.genre ? "Genre: " + getGenreName(selectedId.genre) : null}
                        </List.Item>
                        <List.Item>
                            Platform: {selectedId ? getPlatformName(selectedId.platform) : null}
                        </List.Item>
                        <List.Item>
                            Region: {selectedId ? convertRegionEnum(selectedId.region) : ""}
                        </List.Item>
                        <List.Item>
                            Release Date: {selectedId ? selectedId.release_date : ""}
                        </List.Item>
                        <List.Item>
                            {selectedId ? "Series: " + getSeriesName(selectedId.series) : ""}
                        </List.Item>
                        <List.Item>
                            Shelf: {selectedId ? selectedId.shelf : null}
                        </List.Item>
                        <List.Item>
                            Stock Status: {selectedId ? convertStockEnum(selectedId.stock_status) : null}
                        </List.Item>
                    </List>

            </Modal>
        </>

    );
};


export default GameList;
