import { AiOutlineLogout, AiOutlineQq } from 'react-icons/ai'
import '../css/navi.css';
import '../css/dev.css';
import * as React from 'react'
import { Reset } from 'styled-reset'

const Navi = (props) => {

    const handlerClickComon = () => {
        props.history.push(`/main`);
    };

    const handlerClickAppList = () => {
        props.history.push(`/user/applist`);
    };

    return (
        <>
            <Reset />
            <div id="navi">
                <div className='menu'>
                    <h1 onClick={handlerClickComon} className='home'>COM:ON</h1>
                    <ul className='link'>
                        <li>About us</li>
                        <li onClick={handlerClickAppList}>Application</li>
                        <li>Notice</li>
                    </ul>
                    <div>
                        < AiOutlineLogout ></AiOutlineLogout>
                        < AiOutlineQq />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navi;