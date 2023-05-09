import { RiUser5Line, RiUser5Fill, RiLogoutCircleFill } from 'react-icons/ri'
import '../css/navi.css';
import '../css/dev.css';
import * as React from 'react'
import { Reset } from 'styled-reset'


const Navi = (props) => {

    const handlerClickComon = () => {
        props.history.push(`/`);
    };

    const handlerClickAppList = () => {
        props.history.push(`/user/applist`);
    };

    const handlerGoMypage = () => {
        props.history.push(`/mypage`);
    };

    const handlerClickNotice = () => {
        props.history.push(`/notice`)
    }

    return (
        <>
            <Reset />
            <div id="navi">
                <div className='user-navi'>
                    <h1 onClick={handlerClickComon} className='user-home'>COM:ON</h1>
                    <ul className='user-link'>
                        <li>About us</li>
                        <li onClick={handlerClickAppList}>Application</li>
                        <li onClick={handlerClickNotice}>Notice</li>
                    </ul>
                    <div id="user-button">
                        < RiLogoutCircleFill className='logout-navi-icon' title='로그아웃'/>
                        < RiUser5Fill className='mypage-navi-icon' title='마이페이지' onClick={handlerGoMypage}/>
                        {/* < RiUser5Line className='login-navi-icon' title='로그인'/> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navi;