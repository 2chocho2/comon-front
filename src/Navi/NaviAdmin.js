import { AiOutlineLogout, AiOutlineQq } from 'react-icons/ai'
import '../css/navi.css';
import '../css/dev.css';
import * as React from 'react'
import { Reset } from 'styled-reset'

const NaviAdmin = () => {
    return (
        <>
        <Reset />
            <div className='menu'>
                <h1 className='home'>COM:ON</h1>
                <ul className='link'>
                    <li>About us</li>
                    <li>Application</li>
                    <li>Notice</li>
                </ul>
                <div>
                    { AiOutlineLogout }
                    { AiOutlineQq }
                </div>
            </div>
        </>
    );
}

export default NaviAdmin;