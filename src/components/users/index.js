import React, { useState, useEffect } from 'react';
import http from '../../components/app/http';
import Toast from '../../components/app/toast';
import MyButton from '../ui/MyButton';

async function getUser(headers, unauthorized) {
    return fetch('/v1/user', {
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

async function putUser(user, headers, unauthorized) {
    return fetch('/v1/user', {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(user)
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

export default function Home() {
    const {headers, unauthorized} = http();
    const [user, setUser] = useState({});
    const [newUser, setNewUser] = useState({});
    const [toast, setToast] = useState({});

    const onSubmit = async e => {
        e.preventDefault();
        const u = {
            ...newUser
            , newPass: undefined
        }

        await putUser(u, headers, unauthorized)
        .then(res => setToast({...res, show: true}))
    };

    function onChange(e) {
        setNewUser({
            ...newUser, 
            [e.target.name]: e.target.value
        });
    }
    
    useEffect(() => {
        getUser(headers, unauthorized)
            .then(res => {
                if(res.type === 'info') {
                    setUser(res.body)
                    setNewUser(res.body) 
                }
                else 
                    setToast({...res, show: true})
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function validateForm() {
        return newUser.login?.length >= 3 && newUser.pass?.length >= 3
                && (user.login !== newUser.login || user.pass !== newUser.pass)
                && newUser.pass === newUser.newPass;
    }

    return (
        <>
            <h2 className="content__title">ПОЛЬЗОВАТЕЛИ</h2>
            <div className="content__window">
                <div className="content__window-top">
                    <h3 className="content__window-title">Управление пользователями</h3>
                    <MyButton buttonText={{text: "Обновить"}} type="submit" disabled={!validateForm()}/> 
                </div>
                <hr />

                <form className="content__form" onSubmit={onSubmit}>
                    <div className="content__form-block">
                        <div className="form__wrapper">
                            {
                                !user && <h6>Loading....</h6>
                            }
                            <div className="form__block-input" controlId="login">
                                <label className="form__label">Login</label>
                                    <input
                                        autoFocus
                                        className="form__input"
                                        type="text"
                                        name="login"
                                        placeholder="Enter a login"
                                        value={newUser?.login}
                                        onChange={onChange}
                                    ></input>
                            </div>
                            <div className="form__block-input" controlId="pass">
                                <label className="form__label">Password</label>
                                    <input
                                        className="form__input"
                                        type="password"
                                        name="pass"
                                        placeholder="Enter a password"
                                        value={newUser?.pass}
                                        onChange={onChange}
                                    ></input>
                            </div>
                            <div className="form__block-input" controlId="newPass">
                                <label className="form__label">Reenter password</label>
                                    <input
                                        className="form__input"
                                        type="password"
                                        name="newPass"
                                        placeholder="Enter a password"
                                        value={newUser?.newPass}
                                        onChange={onChange}
                                    ></input>
                            </div>
                        </div>
                    </div>
                <Toast show={toast?.show} type={toast?.type} title={toast?.title} body={toast?.body}/>
                </form>
            </div>
            
        </>
    );
}
