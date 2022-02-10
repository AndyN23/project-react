import { useState } from 'react';

export default function Http() {
    function getToken() {
        const token = localStorage.getItem('token');
        return token ?? null
    };

    const [token, setToken] = useState(getToken());

    function clearToken() {
        localStorage.removeItem('token')
        setToken(null);
    }

    function saveToken(t) {
        if (t?.status === 'ok') {
            localStorage.setItem('token', t.msg.token);
            setToken(t.msg.token);
        }
    };

    function headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    function unauthorized(data) {
        if(data?.status === 'err' && data?.msg?.info === '401 Unauthorized')
            clearToken()
    };

    async function logout() {
        return fetch('/v1/logout', {
            method: 'POST',
            headers: headers(),
        })
        .then(data => clearToken())
        .catch(e => clearToken())
    }
    async function login(user) {
        return fetch('/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(data => data.json())
        .then(data => {
            if (data?.status === 'ok') {
                localStorage.setItem('token', data.msg.token);
                setToken(data.msg.token);
            }
            else 
                clearToken()
            return data
        })
        .catch(e => ({'status': 'err', 'msg': {'err': 'There is a problem on the server'}}))
    }

    return {
        headers,
        setToken: saveToken,
        token,
        login,
        logout,
        unauthorized,
    }
}
