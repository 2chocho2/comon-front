import { AiOutlineLogout, AiOutlineQq } from 'react-icons/ai'
import '../css/dev.css';
import '../css/navi.css';
import * as React from 'react'
import { Reset } from 'styled-reset'


const NaviMain = (props) => {

    const handlerClickComon = () => {
        props.history.push(`/main`);
    };

    const handlerClickAppList = () => {
        props.history.push(`/user/applist`);
    };



    return (
        <>
            <Reset />
            <div className='main-navi'>
                <div className='loginButton'>
                    <button className='login-btn' type='button'>로그인</button>
                    <button className='login-btn' type='button'>회원가입</button>
                </div>
                <h1 onClick={ handlerClickComon } className='main-home'>COM:ON</h1>
                <ul className='main-link'>
                    <li>About us</li>
                    <li onClick={ handlerClickAppList }>Application</li>
                    <li>Notice</li>
                </ul>
                <div>
                    {AiOutlineLogout}
                    {AiOutlineQq}
                </div>
            </div>
        </>
    );
}

export default NaviMain;