import { RiUser5Line, RiUser5Fill, RiLogoutCircleFill } from 'react-icons/ri'
import '../css/navi.css';
import '../css/dev.css';
import * as React from 'react'
import { Reset } from 'styled-reset'

const NaviDev = (props) => {
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
            <div className='dev-menu'>
                <h1 onClick={handlerClickComon} className='dev-home'>COM:ON</h1>
                <ul className='dev-link'>
                    <li>About us</li>
                    <li onClick={ handlerClickAppList }>Application</li>
                    <li>Notice</li>
                </ul>
                <div id="user-button">
                    < RiLogoutCircleFill className='logout-navi-icon' title='로그아웃' />
                    < RiUser5Fill className='mypage-navi-icon' title='마이페이지' onClick={handlerGoMypage} />
                    {/* < RiUser5Line className='login-navi-icon' title='로그인'/> */}
                </div>
            </div>
        </>
    );
}

export default NaviDev;