import React, { useState } from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
} from 'react-router-dom';

import './App.css';
import Login from './components/login';
import Logout from './components/logout';
import EncodeList from './components/encoder_list';
import Options from './components/options';
import Users from './components/users';
import Key from './components/key';
import VideoWall from './components/video_wall';
import http from './components/app/http'; 
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

// import MyButton from 'components/ui/MyButton';

//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications/
//https://reacttraining.com/blog/react-router-v6-pre//

function App() {
    const { token, setToken } = http();
    const [isShow, setIsShow] = useState(true);
    let navLinkActive = sessionStorage.getItem('current');

    if(!token) {
        return <Login setToken={setToken} />
    }

    // const navLinks = [
    //     {
    //         id: 0,
    //         title: 'ВИДЕО',
    //         link: '/',
    //     },
    //     {
    //         id: 1,
    //         title: 'УПРАВЛЕНИЕ',
    //         link: '/',
    //     },
    //     {
    //         id: 2,
    //         title: 'ПОЛЬЗОВАТЕЛИ',
    //         link: '/',
    //     }
    // ]



    return (
        <>  
            <header className='header'>
                <div className="header__left">
                    <button className="button-header" onClick={(e) => {setIsShow(!isShow)}}>
                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 9.61L16.59 11L11.58 6L16.59 1L18 2.39L14.44 6L18 9.61ZM0 0H13V2H0V0ZM0 7V5H10V7H0ZM0 
                            12V10H13V12H0Z"/>
                        </svg>
                    </button>

                    <div className="header__title">
                        <h1 className="title">VideoWall</h1>
                        <svg width="2" height="20" viewBox="0 0 2 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="1.5" height="19.5" fill="#F4F4F4"/>
                        </svg>
                        <h2 className="title-name">Configuration</h2>
                    </div>
                </div>
                <div className="header__right">
                    <button className="button-header">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 0C8.22391 0 9.87721 0.684819 11.0962 1.90381C12.3152 3.12279 13 4.77609 13 6.5C13 
                            8.11 12.41 9.59 11.44 10.73L11.71 11H12.5L17.5 16L16 17.5L11 12.5V11.71L10.73 11.44C9.59 12.41 
                            8.11 13 6.5 13C4.77609 13 3.12279 12.3152 1.90381 11.0962C0.684819 9.87721 0 8.22391 0 6.5C0 4.77609 
                            0.684819 3.12279 1.90381 1.90381C3.12279 0.684819 4.77609 0 6.5 0ZM6.5 2C4 2 2 4 2 6.5C2 9 4 11 6.5 
                            11C9 11 11 9 11 6.5C11 4 9 2 6.5 2Z" />
                        </svg>
                    </button>
                    <button className="button-header">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 0C0.89 0 0 0.89 0 2V16C0 17.11 0.89 18 2 18H16C17.11 18 18 17.11 18 16V2C18 0.89 
                            17.11 0 16 0H2ZM2 2H16V16H2V2ZM4 4V6H14V4H4ZM4 8V10H14V8H4ZM4 12V14H11V12H4Z"/>
                        </svg>
                    </button>
                    <button className="button-header">
                        <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 23.6C10.6667 23.6 7.72002 21.8933 6.00002 19.3333C6.04002 16.6666 11.3334 15.2 
                            14 15.2C16.6667 15.2 21.96 16.6666 22 19.3333C20.28 21.8933 17.3334 23.6 14 23.6ZM14 4.66663C15.0609 
                            4.66663 16.0783 5.08805 16.8284 5.8382C17.5786 6.58834 18 7.60576 18 8.66663C18 9.72749 17.5786 10.7449 
                            16.8284 11.4951C16.0783 12.2452 15.0609 12.6666 14 12.6666C12.9392 12.6666 11.9217 12.2452 11.1716 
                            11.4951C10.4214 10.7449 10 9.72749 10 8.66663C10 7.60576 10.4214 6.58834 11.1716 5.8382C11.9217 5.08805 
                            12.9392 4.66663 14 4.66663ZM14 0.666626C12.2491 0.666626 10.5152 1.0115 8.89757 1.68157C7.2799 2.35163 
                            5.81004 3.33375 4.57193 4.57187C2.07144 7.07235 0.666687 10.4637 0.666687 14C0.666687 17.5362 2.07144 20.9276 
                            4.57193 23.4281C5.81004 24.6662 7.2799 25.6483 8.89757 26.3184C10.5152 26.9884 12.2491 27.3333 14 27.3333C17.5362 
                            27.3333 20.9276 25.9285 23.4281 23.4281C25.9286 20.9276 27.3334 17.5362 27.3334 14C27.3334 6.62663 21.3334 
                            0.666626 14 0.666626Z" />
                        </svg>
                    </button>

                </div>
            </header>

            <main className="main">
                {isShow && (
                    <div className="navbar">
                        <div className="navbar-block">
                            <div aria-controls='responsive-navbar-nav' />
                            <div id='responsive-navbar-nav' className="navbar-nav">
                                <h2 className="navbar-title">МЕНЮ УПРАВЛЕНИЯ</h2>
                                <nav className='nav'>
                                    <a 
                                        className={'link' + (navLinkActive === '1' ? ' active' : '')}
                                        href="/" 
                                        onClick={() => {
                                        sessionStorage.setItem('current', 1)
                                        }}> 
                                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.1667 3.75V0.833333C12.1667 0.61232 12.0789 0.400358 11.9226 0.244078C11.7663 
                                            0.0877975 11.5543 0 11.3333 0H1.33333C1.11232 0 0.900358 0.0877975 0.744078 0.244078C0.587797 
                                            0.400358 0.5 0.61232 0.5 0.833333V9.16667C0.5 9.38768 0.587797 9.59964 0.744078 9.75592C0.900358 
                                            9.9122 1.11232 10 1.33333 10H11.3333C11.5543 10 11.7663 9.9122 11.9226 9.75592C12.0789 9.59964 
                                            12.1667 9.38768 12.1667 9.16667V6.25L15.5 9.58333V0.416667L12.1667 3.75Z"/>
                                        </svg>
                                        ВИДЕО ПОТОКИ
                                    </a>
                                    <a 
                                        className={'link' + (navLinkActive === '2' ? ' active' : '')}
                                        href='/videowall' 
                                        onClick={() => {
                                        sessionStorage.setItem('current', 2)
                                        }}> 
                                        <svg width="18" height="16" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.50004 3.99996H4.16671V7.33329H5.83337V5.66663H7.50004V3.99996ZM15.8334 
                                            7.33329H14.1667V8.99996H12.5V10.6666H15.8334V7.33329ZM17.5 12.3333H2.50004V2.33329H17.5V12.3333ZM17.5 
                                            0.666626H2.50004C1.57504 0.666626 0.833374 1.40829 0.833374 2.33329V12.3333C0.833374 
                                            12.7753 1.00897 13.1992 1.32153 13.5118C1.63409 13.8244 2.05801 14 
                                            2.50004 14H8.33337V15.6666H6.66671V17.3333H13.3334V15.6666H11.6667V14H17.5C17.9421 14 18.366 
                                            13.8244 18.6786 13.5118C18.9911 13.1992 19.1667 12.7753 19.1667 12.3333V2.33329C19.1667 1.40829 
                                            18.4167 0.666626 17.5 0.666626Z"/>
                                        </svg>
                                        УПРАВЛЕНИЕ СТЕНОЙ 
                                    </a>
                                    <a 
                                        className={'link' + (navLinkActive === '3' ? ' active' : '')}
                                        href='/users' 
                                        onClick={() => {
                                        sessionStorage.setItem('current', 3)
                                        }}> 
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.99974 0.666748C8.97221 0.666748 9.90484 1.05306 10.5925 1.74069C11.2801 2.42832 
                                            11.6664 3.36095 11.6664 4.33341C11.6664 5.30587 11.2801 6.23851 10.5925 6.92614C9.90484 7.61377 
                                            8.97221 8.00008 7.99974 8.00008C7.02728 8.00008 6.09465 7.61377 5.40702 6.92614C4.71939 6.23851 
                                            4.33308 5.30587 4.33308 4.33341C4.33308 3.36095 4.71939 2.42832 5.40702 1.74069C6.09465 1.05306 
                                            7.02728 0.666748 7.99974 0.666748ZM7.99974 9.83341C12.0514 9.83341 15.3331 11.4742 15.3331 
                                            13.5001V15.3334H0.666412V13.5001C0.666412 11.4742 3.94808 9.83341 7.99974 9.83341Z"/>
                                        </svg>
                                        ПОЛЬЗОВАТЕЛИ </a>
                                    <a 
                                        className={'link' + (navLinkActive === '4' ? ' active' : '')}
                                        href='/logout' 
                                        onClick={() => {
                                        sessionStorage.setItem('current', 4)
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="none" viewBox="0 0 16 18" enable-background="new 0 0 16 18" >
                                            <path  d="M14.169,9.548l-3.357-3.485c-0.235-0.245-0.625-0.252-0.87-0.019C9.696,6.279,9.688,6.666,9.923,6.91
                                                l2.36,2.449H5.86c-0.34,0-0.616,0.274-0.616,0.612c0,0.338,0.275,0.612,0.616,0.612h6.428l-2.366,2.472
                                                c-0.234,0.245-0.225,0.634,0.021,0.866c0.119,0.113,0.272,0.169,0.426,0.169c0.162,0,0.325-0.063,0.444-0.189l3.359-3.507
                                                C14.398,10.157,14.398,9.784,14.169,9.548z"/>
                                            <path d="M8.17,18.788H2.925c-0.934,0-1.694-0.755-1.694-1.685V2.911c0-0.929,0.76-1.686,1.694-1.686H8.17
                                                c0.34,0,0.616-0.274,0.616-0.612C8.786,0.274,8.511,0,8.17,0H2.925C1.312,0,0,1.306,0,2.911v14.193
                                                c0,1.604,1.312,2.909,2.925,2.909H8.17c0.34,0,0.616-0.274,0.616-0.612S8.511,18.788,8.17,18.788z"/>
                                        </svg>
                                        
                                        Logout</a>
                                    <a 
                                        className={'link' + (navLinkActive === '5' ? ' active' : '')}
                                        href='/options' 
                                        onClick={() => {
                                        sessionStorage.setItem('current', 5)
                                        }}> 
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.99987 11.9166C8.22632 11.9166 7.48445 11.6093 6.93747 11.0624C6.39049 10.5154 
                                            6.0832 9.77351 6.0832 8.99996C6.0832 8.22641 6.39049 7.48455 6.93747 6.93756C7.48445 
                                            6.39058 8.22632 6.08329 8.99987 6.08329C9.77341 6.08329 10.5153 6.39058 11.0623 6.93756C11.6092 
                                            7.48455 11.9165 8.22641 11.9165 8.99996C11.9165 9.77351 11.6092 10.5154 11.0623 11.0624C10.5153 
                                            11.6093 9.77341 11.9166 8.99987 11.9166ZM15.1915 9.80829C15.2249 9.54163 15.2499 9.27496 15.2499 
                                            8.99996C15.2499 8.72496 15.2249 8.44996 15.1915 8.16663L16.9499 6.80829C17.1082 6.68329 17.1499 
                                            6.45829 17.0499 6.27496L15.3832 3.39163C15.2832 3.20829 15.0582 3.13329 14.8749 3.20829L12.7999 
                                            4.04163C12.3665 3.71663 11.9165 3.43329 11.3915 3.22496L11.0832 1.01663C11.0499 0.816626 10.8749 
                                            0.666626 10.6665 0.666626H7.3332C7.12487 0.666626 6.94987 0.816626 6.91653 1.01663L6.6082 3.22496C6.0832 
                                            3.43329 5.6332 3.71663 5.19987 4.04163L3.12487 3.20829C2.94153 3.13329 2.71653 3.20829 2.61653 
                                            3.39163L0.949866 6.27496C0.841533 6.45829 0.891533 6.68329 1.04987 6.80829L2.8082 8.16663C2.77487 8.44996 
                                            2.74987 8.72496 2.74987 8.99996C2.74987 9.27496 2.77487 9.54163 2.8082 9.80829L1.04987 11.1916C0.891533 
                                            11.3166 0.841533 11.5416 0.949866 11.725L2.61653 14.6083C2.71653 14.7916 2.94153 14.8583 3.12487 
                                            14.7916L5.19987 13.95C5.6332 14.2833 6.0832 14.5666 6.6082 14.775L6.91653 16.9833C6.94987 17.1833 
                                            7.12487 17.3333 7.3332 17.3333H10.6665C10.8749 17.3333 11.0499 17.1833 11.0832 16.9833L11.3915 14.775C11.9165 
                                            14.5583 12.3665 14.2833 12.7999 13.95L14.8749 14.7916C15.0582 14.8583 15.2832 14.7916 15.3832 14.6083L17.0499 
                                            11.725C17.1499 11.5416 17.1082 11.3166 16.9499 11.1916L15.1915 9.80829Z"/>
                                        </svg>
                                        ОБНОВЛЕНИЕ  
                                    </a>
                                    <a 
                                        className={'link' + (navLinkActive === '6' ? ' active' : '')}
                                        href='/key' 
                                        onClick={() => {
                                        sessionStorage.setItem('current', 6)
                                        }}> 
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.99996 0.666626C13.5833 0.666626 17.3333 4.41663 17.3333 8.99996C17.3333 13.5833 
                                            13.5833 17.3333 8.99996 17.3333C4.41663 17.3333 0.666626 13.5833 0.666626 8.99996C0.666626 4.41663 
                                            4.41663 0.666626 8.99996 0.666626ZM5.66663 13.1666H12.3333V11.5H5.66663V13.1666ZM12.3333 
                                            7.33329H10.25V3.99996H7.74996V7.33329H5.66663L8.99996 10.6666L12.3333 7.33329Z"/>
                                        </svg>
                                        Настройки
                                    </a>
                                </nav>
                                {/* <form inline>
                                    <MyButton buttonText={{text: "Поиск"}} variant='outline-info'/>
                                </form> */}
                            </div>
                        </div>
                    </div>
                )}
                
                <BrowserRouter>
                    <div className="content" >
                        <div className="content__block">
                            <Routes>
                                <Route exact path="/" element={<EncodeList/>}/>
                                <Route exact path="/videowall" element={<VideoWall/>}/>
                                <Route exact path="/users" element={<Users/>}/>
                                <Route exact path="/logout" element={<Logout/>}/>
                                <Route exact path="/options" element={<Options/>}/>
                                <Route exact path="/key" element={<Key/>}/>
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </main>
        </>
    );
}

export default App;
