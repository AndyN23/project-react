import React, { useState, useEffect } from 'react';
import http from '../../components/app/http';
import { Form, Button, Modal} from "react-bootstrap"
import Toast from '../../components/app/toast';
import MyButton from '../../components/ui/MyButton';

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

async function putEncoderList(items, headers, unauthorized) {
    return fetch('/v1/encoder_list', {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(items)
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

export default function EncoderList() {
    const {headers, unauthorized} = http();
    const [items, setItems] = useState([]);
    const [toast, setToast] = useState({});
    const [formRemove, setFormRemove] = useState({'show':false, index: -1});
    const [form, setForm] = useState({'show':false});

    const onSubmit = async e => {
        e.preventDefault();
        const k = {
            'items': items
        }

        await putEncoderList(k, headers, unauthorized)
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
                if(res.type === 'info')
                    setItems(res.body)
                else 
                    setToast({...res, show: true})
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                <Button variant='secondary' onClick={()=> setFormRemove({...formRemove, 'show': false})}>Close</Button>
                <Button variant="primary" onClick={onRemoveClicked}>Remove</Button>
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
            <Button variant='secondary' onClick={()=> setForm({...form, 'show': false})}>Close</Button>
            <Button variant='primary' disabled={!onFormEdit()} onClick={() => addStream(form?.index)}>{form?.button}</Button>
        </Modal.Footer>
        </Modal>

            <h2 className="content__title">ВИДЕО ПОТОКИ</h2>
            <div className="content__window">
                <div className="content__window-top">
                    <h3 className="content__window-title">СПИСОК ВИДЕО ПОТОКОВ В СИСТЕМЕ</h3>
                    <div className="content__window-buttons">
                        <MyButton buttonText={{text: "Добавить"}} onClick={onAddClicked}/>
                        <MyButton buttonText={{text: "Обновить"}} type="submit" disabled={items?.length < 1}/>
                        <MyButton buttonText={{text: "Удалить"}}/>
                    </div>
                </div>
                <hr />

                <form className="content__form form__table" onSubmit={onSubmit}>
                        <div striped bordered hover variant='dark' className="table">
                            <div className="table__head">
                                <div className="table__row">
                                    <div>#</div>
                                    <div>НАЗВАНИЕ</div>
                                    <div>АДРЕС ИСТОЧНИКА 1</div>
                                    <div>АДРЕС ИСТОЧНИКА 2</div>
                                    <div>УПРАВЛЕНИЕ</div>
                                </div>
                            </div>
                            
                            {/* <hr/> */}
                            
                            <div className="table__body">
                                {
                                    items.map((item, index) => 
                                        <div 
                                            className="table__row"
                                            key={index}>
                                            <div>
                                                <input type="checkbox" className="table__checkbox" id={index}/> 
                                                <label for={index}></label>
                                            </div>
                                            <div>{item.name}</div>
                                            <div className="table__row-item">{item.url1}</div>
                                            <div className="table__row-item">{item.url2}</div>
                                            <div>
                                                <button className="button-encoder" onClick={() => onEditClicked(index)}>
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.99987 11.9166C8.22632 11.9166 7.48445 11.6093 6.93747 11.0624C6.39049 10.5154 6.0832 9.77351 6.0832 8.99996C6.0832 
                                                        8.22641 6.39049 7.48455 6.93747 6.93756C7.48445 6.39058 8.22632 6.08329 8.99987 6.08329C9.77341 6.08329 10.5153 6.39058 11.0623 
                                                        6.93756C11.6092 7.48455 11.9165 8.22641 11.9165 8.99996C11.9165 9.77351 11.6092 10.5154 11.0623 11.0624C10.5153 11.6093 9.77341 
                                                        11.9166 8.99987 11.9166ZM15.1915 9.80829C15.2249 9.54163 15.2499 9.27496 15.2499 8.99996C15.2499 8.72496 15.2249 8.44996 15.1915 
                                                        8.16663L16.9499 6.80829C17.1082 6.68329 17.1499 6.45829 17.0499 6.27496L15.3832 3.39163C15.2832 3.20829 15.0582 3.13329 14.8749 
                                                        3.20829L12.7999 4.04163C12.3665 3.71663 11.9165 3.43329 11.3915 3.22496L11.0832 1.01663C11.0499 0.816626 10.8749 0.666626 10.6665 
                                                        0.666626H7.3332C7.12487 0.666626 6.94987 0.816626 6.91653 1.01663L6.6082 3.22496C6.0832 3.43329 5.6332 3.71663 5.19987 4.04163L3.12487 
                                                        3.20829C2.94153 3.13329 2.71653 3.20829 2.61653 3.39163L0.949866 6.27496C0.841533 6.45829 0.891533 6.68329 1.04987 6.80829L2.8082 
                                                        8.16663C2.77487 8.44996 2.74987 8.72496 2.74987 8.99996C2.74987 9.27496 2.77487 9.54163 2.8082 9.80829L1.04987 11.1916C0.891533 11.3166 
                                                        0.841533 11.5416 0.949866 11.725L2.61653 14.6083C2.71653 14.7916 2.94153 14.8583 3.12487 14.7916L5.19987 13.95C5.6332 14.2833 6.0832 
                                                        14.5666 6.6082 14.775L6.91653 16.9833C6.94987 17.1833 7.12487 17.3333 7.3332 17.3333H10.6665C10.8749 17.3333 11.0499 17.1833 11.0832 
                                                        16.9833L11.3915 14.775C11.9165 14.5583 12.3665 14.2833 12.7999 13.95L14.8749 14.7916C15.0582 14.8583 15.2832 14.7916 15.3832 14.6083L17.0499 
                                                        11.725C17.1499 11.5416 17.1082 11.3166 16.9499 11.1916L15.1915 9.80829Z"/>
                                                    </svg>
                                                </button>
                                                <button className="button-encoder" onClick={() => setFormRemove({"show":true, 'index': index, "name": item.name})}>
                                                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14.2082 1.33333H10.8541L9.89573 0.5H5.10407L4.14573 1.33333H0.791565V3H14.2082V1.33333ZM1.7499 13.8333C1.7499 
                                                        14.2754 1.95183 14.6993 2.31128 15.0118C2.67072 15.3244 3.15823 15.5 3.66657 15.5H11.3332C11.8416 15.5 12.3291 15.3244 
                                                        12.6885 15.0118C13.048 14.6993 13.2499 14.2754 13.2499 13.8333V3.83333H1.7499V13.8333Z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div> 
                        </div>
                    <Toast show={toast?.show} type={toast?.type} title={toast?.title} body={toast?.body}/>
                </form>
            </div> 
        </>
    );
}
