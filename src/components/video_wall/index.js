import React, { useState, useEffect,} from 'react';
import http from '../../components/app/http';
import {Row, Col, Form, Table, Modal, Alert} from "react-bootstrap"
import Toast from '../../components/app/toast';

import MyButton from '../ui/MyButton';
import MyDropdown from '../ui/MyDropdown';



async function getEncoderList(headers, unauthorized) {
    return fetch('/v1/encoder_list', {
        method: 'GET',
        headers: headers(),
    })
    .then(data => data.json())
    .then(data => {
        if(data?.status === 'ok')
            return {'type': 'info', 'title':'Information', 'body': data.msg}

        unauthorized(data)
        return {'type': 'danger', 'title':'Error', 'body': data.msg.err}
    })
    .catch(e => { return {'type': 'danger', 'title':'Critical Error', 'body': 'Server error'}})
}

async function getVideoWall(headers, unauthorized) {
    return fetch('/v1/video_wall', {
        method: 'GET',
        headers: headers(),
    })
    .then(data => data.json())
    .then(data => {
        if(data?.status === 'ok')
            return {'type': 'info', 'title':'Information', 'body': data.msg}

        unauthorized(data)
        return {'type': 'danger', 'title':'Error', 'body': data.msg.err}
    })
    .catch(e => { return {'type': 'danger', 'title':'Critical Error', 'body': 'Server error'}})
}

async function putVideoWall(vw, headers, unauthorized) {
    return fetch('/v1/video_wall', {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(vw)
    })
    .then(data => data.json())
    .then(data => {
        if(data?.status === 'ok')
            return {'type': 'info', 'title':'Information', 'body': 'User data successfully updated'}

        unauthorized(data)
        return {'type': 'danger', 'title':'Error', 'body': data.msg.err}
    })
    .catch(e => { return {'type': 'danger', 'title':'Critical Error', 'body': 'Server error'}})
}

export default function VideoWall() {
    const {headers, unauthorized} = http();
    const [toast, setToast] = useState({});
    const [items, setItems] = useState(['dsdsfds']);
    const [vmItems, setVmItems] = useState({"items": [{},{}, {}, {}, {}, {}, {}, {}, {}]});
    const [formRemove, setFormRemove] = useState({'show':false, index: -1});
    const [form, setForm] = useState({'show':false});
    const[selected, setSelected] = useState("Раскладка монитора");
    const[selid, setSelid] = useState(0);
    const [boards, setBoards] = useState( [
        { id: 0, title: 'list' , boardArray:[...items]},
        { id: 1, title: 'screen' , boardArray:[]},
        { id: 2, title: 'screen_2', boardArray:[]},
    ])
    let [myItem, setMyItem] = useState();
    let [myItems, setMyItems] = useState([]);

    const onSubmit = async e => {
        e.preventDefault();
        const k = {
            'video_wall': vmItems
        }

        await putVideoWall(k, headers, unauthorized)
        .then(res => setToast({...res, show: true}))
    };

    function onAddClicked() {
        toast.show = false
        setForm({
                'show': true,
                'title': "Add a new video stream",
                'button': "Add",
                'name': '',
                'url1': '',
                'url2': '',
                'index': -1
            }
        )
    }
    function onEditClicked(key) {
        toast.show = false
        setForm({
                'show': true,
                'title': "Edit the video stream",
                'button': "Edit",
                'name': items[key].name,
                'url1': items[key].url1,
                'url2': items[key].url2,
                'index': key
            }
        )
    }
    function onRemoveClicked() {
        toast.show = false
        setItems(items.filter((_, index) => index !== formRemove.index))
        setFormRemove({"show": false})
    }

    function addStream(index) {
        toast.show = false
        const pos = index < 0 ? items.length + 1 : items[index].pos
        const item = {
            'name': form.name,
            'url1': form.url1,
            'url2': form.url2,
            'pos':  pos,
            'transport': 'tcp'

        }
        if(index < 0) {
            setItems(
                [
                    ...items
                    , item
                ]
            )
        } else 
            items[index] = item
        setForm({...form, 'show': false})
    }

    function formOnChange(e) {
        toast.show = false
        setForm({
            ...form, 
            [e.target.name]: e.target.value
        });
    }
    function onFormEdit() {
        return form?.url1?.length > 5 && form?.name?.length >= 3

    }

    useEffect(() => {
        getEncoderList(headers, unauthorized)
            .then(res => {
                if(res.type === 'info'){
                    const x = boards
                    x[0].boardArray = res.body
                    setItems(res.body)
                    setBoards(x)
                }
                else 
                    setToast({...res, show: true})
            })
        getVideoWall(headers, unauthorized)
            .then(res => {
                if(res.type === 'info')
                    setVmItems(res.body)
                else 
                    setToast({...res, show: true})
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function dragStartHandler(e, item) {
        console.log( 'drag', item)
        myItem = item     
    }

    function dragOverHandler(e,item) {
        e.preventDefault()
    }

    function dropHandler(e, index) {
        e.preventDefault()
        setMyItem(myItem)
        let items = myItems
        items[index] = myItem
        setMyItems(items)        
    }

    function setItem(i) {
        return( 
            <div
                className = {'screen-' + (i + 1)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, i)}>
                {myItems?.[i]?.name}
            </div>);
    }

    return (
        <>
        <Modal
            show={formRemove?.show}
            onHide={() => setFormRemove(false)}
        >
            <Modal.Body>
                <h5 className="text-center">Do you really want to remove the '{formRemove?.name}' video stream?</h5>
            </Modal.Body>

            <Modal.Footer>
                <MyButton buttonText={{text: "Закрыть"}}  onClick={()=> setFormRemove({...formRemove, 'show': false})}/>
                <MyButton buttonText={{text: "Удалить"}} onClick={onRemoveClicked}/>
            </Modal.Footer>
        </Modal>
        <Modal
            show={form?.show}
            dialogClassName='modal-100w'
            onHide={() => setForm({...form, 'show': false})}
        >
        <Modal.Header closeButton>
            <Modal.Title>
                {form?.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    name="name"
                    placeholder="Enter a name"
                    value={form?.name}
                    onChange={formOnChange}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="url1">
                    <Form.Label>RTSP stream (high quality)</Form.Label>
                    <Form.Control
                        type="text"
                        name="url1"
                        placeholder="Enter a url"
                        value={form?.url1}
                        onChange={formOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="url2">
                    <Form.Label>RTSP stream (low quality)</Form.Label>
                    <Form.Control
                        type="text"
                        name="url2"
                        placeholder="Enter a url"
                        value={form?.url2}
                        onChange={formOnChange}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <MyButton buttonText={{text: "Закрыть"}}  onClick={()=> setForm({...form, 'show': false})}/>
            <MyButton  disabled={!onFormEdit()} onClick={() => addStream(form?.index)}>{form?.button}</MyButton>
        </Modal.Footer>
        </Modal>

        <h2 className="content__title">УПРАВЛЕНИЕ ВИДЕО СТЕНОЙ</h2>
            <div className="content__window stream">
                <div className="content__window-left">
                    <h3 className="window-left__title">ВИДЕО ПОТОКИ</h3>
                    <div  className="window-left__table">
                        {boards[0].boardArray.map((item, index) =>
                        <div 
                            draggable="true"
                            onDragStart={(e) => dragStartHandler(e, item)}
                            className="window-left__row"
                            key={index}>
                            <span>
                                {index + 1}.
                            </span>
                            {item.name}
                        </div>
                        )}
                    </div>
                </div>
                <div className="content__window-right">
                    <div className="content__window-top">
                        <div className="screen__block">
                            <MyButton buttonText={{text: "Монитор 1"}} type="submit"/>
                        </div>

                        <div className="setting__block">
                            <MyButton buttonText={{text: "Обновить"}} type="submit" disabled={vmItems?.items.length < 1}/>
                            <MyButton buttonText={{text: "Отмена"}} type="submit" />  
                        </div>
                    </div>
                    <hr/>
                    <div className="content__window-undertop">
                        <h3 className="undertop__title">Монитор 1</h3>
                        <MyDropdown selected={selected} setSelected={setSelected} setSelid={setSelid}/>
                    </div>
                    <form className="screen-form">
                        <div classname="screen__block">
                            {  selid == 0 &&(
                                <div className="screen__first-split split">
                                    {setItem(0)}
                                </div>
                                )
                            }

                            {  selid == 1 &&(
                                <div className="screen__second-split split">
                                    {setItem(0)}
                                    {setItem(1)}
                                    {setItem(2)}
                                    {setItem(3)}
                                </div> 
                                )
                            }

                            {  selid == 2 &&(
                                <div className="screen__third-split split">
                                    {setItem(0)}
                                    {setItem(1)}
                                    {setItem(2)}
                                    {setItem(3)}
                                    {setItem(4)}
                                    {setItem(5)}
                                </div> 
                                )
                            }

                            {  selid == 3 &&(
                                <div className="screen__fourth-split split">
                                    {setItem(0)}
                                    {setItem(1)}
                                    {setItem(2)}
                                    {setItem(3)}
                                    {setItem(4)}
                                    {setItem(5)}
                                    {setItem(6)}
                                    {setItem(7)}
                                    {setItem(8)}
                                </div> 
                                )
                            }

                            {  selid == 4 &&(
                                <div className="screen__fifth-split split">
                                    {setItem(0)}
                                    {setItem(1)}
                                    {setItem(2)}
                                    {setItem(3)}
                                    {setItem(4)}
                                    {setItem(5)}
                                    {setItem(6)}
                                    {setItem(7)}
                                    {setItem(8)}
                                    {setItem(9)}
                                    {setItem(10)}
                                    {setItem(11)}
                                </div> 
                                )
                            }

                            {  selid == 5 &&(
                                <div className="screen__six-split split">
                                    {setItem(0)}
                                    {setItem(1)}
                                    {setItem(2)}
                                    {setItem(3)}
                                    {setItem(4)}
                                    {setItem(5)}
                                    {setItem(6)}
                                    {setItem(7)}
                                    {setItem(8)}
                                    {setItem(9)}
                                    {setItem(10)}
                                    {setItem(11)}
                                    {setItem(12)}
                                    {setItem(13)}
                                    {setItem(14)}
                                    {setItem(15)}
                                </div> 
                                )
                            }

                            {  selid == 6 &&(
                                <div className="screen__seven-split split">
                                    {setItem(0)}
                                    {setItem(1)}
                                    {setItem(2)}
                                    {setItem(3)}
                                    {setItem(4)}
                                    {setItem(5)}
                                    {setItem(6)}
                                    {setItem(7)}
                                    {setItem(8)}
                                    {setItem(9)}
                                    {setItem(10)}
                                    {setItem(11)}
                                    {setItem(12)}
                                    {setItem(13)}
                                    {setItem(14)}
                                    {setItem(15)}
                                    {setItem(16)}
                                    {setItem(17)}
                                    {setItem(18)}
                                    {setItem(19)}
                                    {setItem(20)}
                                    {setItem(21)}
                                    {setItem(22)}
                                    {setItem(23)}
                                </div> 
                                )
                            }

                            {  selid == 7 &&(
                                <div className="screen__eight-split split">
                                    {setItem(0)}
                                    {setItem(1)}
                                    {setItem(2)}
                                    {setItem(3)}
                                    {setItem(4)}
                                    {setItem(5)}
                                </div> 
                                )
                            }

                            {  selid == 8 &&(
                                <div className="screen__nine-split split">
                                    {setItem(0)}
                                    {setItem(1)}
                                    {setItem(2)}
                                    {setItem(3)}
                                    {setItem(4)}
                                    {setItem(5)}
                                    {setItem(6)}
                                    {setItem(7)}
                                    {setItem(8)}
                                    {setItem(9)}
                                    {setItem(10)}
                                    {setItem(11)}
                                    {setItem(12)}
                                </div> 
                                )
                            }
                        </div>
                        <Toast show={toast?.show} type={toast?.type} title={toast?.title} body={toast?.body}/>
                    </form>
                </div>
            </div>
        </>
    )
}
