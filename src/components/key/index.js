import React, { useState, useEffect } from 'react';
import http from '../../components/app/http';
import {Badge} from "react-bootstrap"
import Toast from '../../components/app/toast';
import MyButton from '../ui/MyButton';

async function getKey(headers, unauthorized) {
    return fetch('/v1/key', {
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

async function putKey(key, headers, unauthorized) {
    return fetch('/v1/key', {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(key)
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

export default function Key() {
    const {headers, unauthorized} = http();
    const [key, setKey] = useState({});
    const [toast, setToast] = useState({});

    const onSubmit = async e => {
        e.preventDefault();
        const k ={
            'key': key.key
        }

        await putKey(k, headers, unauthorized)
        .then(res => setToast({...res, show: true}))
    };

    function onChange(e) {
        toast.show = false
        setKey({
            ...key, 
            'key': e.target.value
        });
    }
    
    useEffect(() => {
        getKey(headers, unauthorized)
            .then(res => {
                if(res.type === 'info')
                    setKey(res.body)
                else 
                    setToast({...res, show: true})
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>  
            <h2 className="content__title">Настройки</h2>
            <div className="content__window">
                <div className="content__window-top">
                    <h3 className="content__window-title">УПРАВЛЕНИЕ НАСТРОЙКАМИ СИСТЕМЫ</h3>
                    <MyButton buttonText={{text: "Обновить"}} type="submit" disabled={key?.key < 10}/> 
                </div>
                <hr />

                <form className="content__form" onSubmit={onSubmit}> 
                    <div className="content__form-block">
                        <div className="form__wrapper">
                            {
                                !key && <h6>Loading....</h6>
                            }
                            <div className="form__block-input" controlId="key">
                                <label className="form__label">Enter a license key</label>
                                <input
                                    className="form__input"
                                    type="text"
                                    name="key"
                                    placeholder="Enter a key"
                                    value={key?.key}
                                    onChange={onChange}
                                ></input>
                            </div>
                            <div className="form__block-input disabled">
                                <label className="form__label">Mac address</label>
                                <input
                                    className="form__input"
                                    type="text"
                                    value={key?.mac}
                                    disabled
                                ></input>
                            </div>
                        </div>
                        {
                        key?.status &&
                            <div>
                                <Badge pill bg={key?.status === 'valid' ? 'success' : 'danger'} className="mt-5">
                                    {key?.status === 'valid' ? 'Valid' : 'Invalid'}
                                </Badge>
                            </div>
                        }
                    </div>
                    <Toast show={toast?.show} type={toast?.type} title={toast?.title} body={toast?.body}/>
                </form>
                
            </div>

                
        </>
    );
}
