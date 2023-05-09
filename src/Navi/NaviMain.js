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
    const handlerGoMypage = () => {
        props.history.push(`/mypage`);
    }

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
                {/* <div id="user-button">
                        < RiLogoutCircleFill className='logout-navi-icon' title='로그아웃'/>
                        < RiUser5Fill className='mypage-navi-icon' title='마이페이지' onClick={handlerGoMypage}/>
                        {/* < RiUser5Line className='login-navi-icon' title='로그인'/> 
                </div> */}
            </div>
        </>
    );
}

export default NaviMain;