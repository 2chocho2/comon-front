import { RiUser5Line, RiUser5Fill, RiLogoutCircleFill } from 'react-icons/ri'
import '../css/dev.css';
import '../css/navi.css';
import * as React from 'react'
import { Reset } from 'styled-reset'


const NaviMain = (props) => {

    const handlerClickComon = () => {
        props.history.push(`/`);
    };

    const handlerClickAppList = () => {
        props.history.push(`/user/applist`);
    };
    
    // const handlerGoMypage = () => {
    //     props.history.push(`/mypage`);
    // }
    const handlerGoLogin = () => {
        props.history.push(`/login`)
    };

    const handlerGoRegist = () => {
        props.history.push(`/regist`)
    };

    const handlerClickNotice = () => {
        props.history.push(`/notice`)
    };

    return (
        <>
            <Reset />
            <div className='main-navi'>
                <div className='loginButton'>
                    <button onClick={handlerGoLogin} className='login-btn' type='button'>로그인</button>
                    <button onClick={handlerGoRegist} className='login-btn' type='button'>회원가입</button>
                </div>
                <h1 onClick={handlerClickComon} className='main-home'>COM:ON</h1>
                <ul className='main-link'>
                    <li>About us</li>
                    <li onClick={handlerClickAppList}>Application</li>
                    <li onClick={handlerClickNotice}>Notice</li>
                </ul>
            </div>
        </>
    );
}

export default NaviMain;