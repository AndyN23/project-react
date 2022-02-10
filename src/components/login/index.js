import React, { useState } from 'react';
import Http from '../../components/app/http';
import Toast from '../../components/app/toast';
import MyButton from '../ui/MyButton';

export default function Login({setToken}) {
    const [user, setUser] = useState({});
    const {login} = Http();
    const [toast, setToast] = useState({});

    const onSubmit = async e => {
        e.preventDefault();

        await login(user)
            .then(data => {
                if (data?.status === 'err')
                    setToast({ 'show': true, 'type': 'danger', 'title':'Server Error', 'body': data.msg.err})
                else
                    setToken(data)
            });
    }

    function validateForm() {
        return user.login?.length >= 3 && user.pass?.length >= 3;
    }
    function onChange(e) {
        setToast({})
        setUser({
            ...user, 
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
        <div className="login__page">
            <div className="login__header">
                <div className="login__text">
                    <h1 className="login__text-name">Videowall</h1>
                    <p className="login__text-text">system managment</p>
                </div>
            </div> 
            <div className="login__form-block">
                <form className="form" onSubmit={onSubmit}>
                    <h1 className="form__title">VIDEOWALL</h1>
                    <div className="form__block-input" controlId="login">
                        {/* <label>Login</label> */}
                        {/* <Form.Control
                            autoFocus
                            type="text"
                            name="login"
                            placeholder="Enter a login"
                            value={user?.login}
                            onChange={onChange}
                        /> */}
                        <span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99974 0.666748C8.97221 0.666748 9.90484 1.05306 10.5925 1.74069C11.2801 2.42832 
                                11.6664 3.36095 11.6664 4.33341C11.6664 5.30587 11.2801 6.23851 10.5925 6.92614C9.90484 7.61377 
                                8.97221 8.00008 7.99974 8.00008C7.02728 8.00008 6.09465 7.61377 5.40702 6.92614C4.71939 6.23851 
                                4.33308 5.30587 4.33308 4.33341C4.33308 3.36095 4.71939 2.42832 5.40702 1.74069C6.09465 1.05306 
                                7.02728 0.666748 7.99974 0.666748ZM7.99974 9.83341C12.0514 9.83341 15.3331 11.4742 15.3331 
                                13.5001V15.3334H0.666412V13.5001C0.666412 11.4742 3.94808 9.83341 7.99974 9.83341Z" fill="#9A9FAA"/>
                            </svg>
                        </span>
                        <input autoFocus
                            type="text"
                            className="login"
                            name="login"
                            placeholder="Enter a login"
                            value={user?.login}
                            onChange={onChange} >
                        </input>   
                        {/* <span className="text-muted">
                            Login minimum 3 chars
                        </span> */}
                    </div>
                    <div className="form__block-input" controlId="pass">
                        {/* <label>Password</label> */}
                        {/* <Form.Control
                            type="password"
                            name="pass"
                            placeholder="Enter a password"
                            value={user?.pass}
                            onChange={onChange}
                        /> */}
                        <span>
                            <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99974 15.5832C6.98224 15.5832 6.16641 14.7582 6.16641 13.7498C6.16641 12.7323 
                                6.98224 11.9165 7.99974 11.9165C8.48598 11.9165 8.95229 12.1097 9.29611 12.4535C9.63992 
                                12.7973 9.83308 13.2636 9.83308 13.7498C9.83308 14.2361 9.63992 14.7024 9.29611 15.0462C8.95229 
                                15.39 8.48598 15.5832 7.99974 15.5832ZM13.4997 18.3332V9.1665H2.49975V18.3332H13.4997ZM13.4997 
                                7.33317C13.986 7.33317 14.4523 7.52633 14.7961 7.87014C15.1399 8.21396 15.3331 8.68027 15.3331 
                                9.1665V18.3332C15.3331 18.8194 15.1399 19.2857 14.7961 19.6295C14.4523 19.9734 13.986 20.1665 
                                13.4997 20.1665H2.49975C1.48225 20.1665 0.666412 19.3415 0.666412 18.3332V9.1665C0.666412 8.149 
                                1.48225 7.33317 2.49975 7.33317H3.41641V5.49984C3.41641 4.28426 3.8993 3.11847 4.75884 2.25893C5.61838 
                                1.39939 6.78417 0.916504 7.99974 0.916504C8.60164 0.916504 9.19763 1.03506 9.75371 1.26539C10.3098 
                                1.49572 10.815 1.83333 11.2407 2.25893C11.6663 2.68453 12.0039 3.1898 12.2342 3.74587C12.4645 4.30195 
                                12.5831 4.89795 12.5831 5.49984V7.33317H13.4997ZM7.99974 2.74984C7.2704 2.74984 6.57093 3.03957 6.0552 
                                3.55529C5.53948 4.07102 5.24975 4.77049 5.24975 5.49984V7.33317H10.7497V5.49984C10.7497 4.77049 10.46 
                                4.07102 9.94429 3.55529C9.42856 3.03957 8.72909 2.74984 7.99974 2.74984Z" fill="#9A9FAA"/>
                            </svg>
                        </span>
                        <input
                            type="password"
                            className="password"
                            name="pass"
                            placeholder="Enter a password"
                            value={user?.pass}
                            onChange={onChange}>
                        </input>
                    </div>
                    <div className='form__block-button'>
                        <MyButton buttonText={{text: "Войти"}} type="submit" disabled={!validateForm()}/>
                        <MyButton buttonText={{text: "Закрыть"}}/>
                    </div>
                    
                </form>
            </div>
        </div>
        <Toast show={toast?.show} type={toast?.type} title={toast?.title} body={toast?.body}/>
        </>
    )
}
