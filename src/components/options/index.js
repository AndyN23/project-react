import React, { useState } from 'react';
import Http from '../../components/app/http';
import Toast from '../../components/app/toast';
import MyButton from '../ui/MyButton';

async function doRestart(headers, unauthorized) {
    return fetch('/v1/server/restart/system', {
        method: 'POST',
        headers: headers()
    })
    .then(data => data.json())
    .then(data => {
        if(data?.status === 'ok')
            return {'type': 'info', 'title':'Information', 'body': 'Restart successfully'}

        unauthorized(data)
        return {'type': 'danger', 'title':'Error', 'body': data.msg.err}
    })
    .catch(e => { return {'type': 'danger', 'title':'Critical Error', 'body': 'Server error'}})
}
async function doStop(headers, unauthorized) {
    return fetch('/v1/server/stop/system', {
        method: 'POST',
        headers: headers()
    })
    .then(data => data.json())
    .then(data => {
        if(data?.status === 'ok')
            return {'type': 'info', 'title':'Information', 'body': 'Stop successfully'}

        unauthorized(data)
        return {'type': 'danger', 'title':'Error', 'body': data.msg.err}
    })
    .catch(e => { return {'type': 'danger', 'title':'Critical Error', 'body': 'Server error'}})
}

export default function Options() {
    const {headers, unauthorized} = Http();
    const [toast, setToast] = useState({});

    const restart = async e => {
        doRestart(headers, unauthorized)
            .then(res => setToast({...res, show: true}));
    }
    const stop = async e => {
        doStop(headers, unauthorized)
            .then(res => setToast({...res, show: true}));
    }

    return (
        <>  
            <h2 className="content__title">Обновления</h2>
            <div className="content__window">
                <div className="content__window-top">
                    <h3 className="content__window-title">Options administration</h3>
                </div>
                <hr />

                <form className="content__form options">
                    <div className="content__form-block">
                        <div className="form__wrapper">
                            <h4 className="options__button-name">Restart</h4>
                            <MyButton buttonText={{text: "Обновить"}} onClick={restart}/>
                            <h4 className="options__button-name">Stop</h4>
                            {/* <Button className='mb-3' onClick={stop}>Update</Button> */}
                            <MyButton buttonText={{text: "Остановить"}} onClick={stop}/>
                        </div>
                    </div>
                    <Toast show={toast?.show} type={toast?.type} title={toast?.title} body={toast?.body}/>
                </form>
            </div>
        </>
    )
}
