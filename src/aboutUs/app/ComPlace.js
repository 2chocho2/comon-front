import { Link } from 'react-router-dom/cjs/react-router-dom';
import Navi from '../../Navi/Navi';
import { useState } from 'react';
import DropdownStore from "../store/DropdownStore";
import DropdownApp from "../app/DropdownApp";
import map1 from './img/complace1.PNG'

const ComPlace = ({ history }) => {

    const handlerAboutUsMain = () => {
        history.push(`/user/aboutus`)
    };
    const [viewStore, setViewStore] = useState(false);
    const [viewApp, setViewApp] = useState(false);

    return (
        <div className="about_container">
            <Navi history={history} />
            <div className='sidemenu_aboutus_box'>
                <div className='about_logo' onClick={handlerAboutUsMain}></div>

                <ul className='sidemenu_aboutus'>
                    <li><Link to='/user/about/team'>팀원 소개</Link></li>
                    <li><Link to='/user/about/project'>프로젝트 소개</Link></li>
                    <li><Link to='/user/about/schedule'>진행 일정</Link></li>
                    <li><Link to='/user/about/skill'>주요 기능 설명</Link></li>
                </ul>
            </div>
            <div className="body">
                <div className="about_drop_store">
                    <ul onClick={() => { setViewStore(!viewStore) }}>
                        앱 스토어
                        {viewStore && <DropdownStore />}
                    </ul>
                </div>

                <div className="about_drop_app">
                    <ul onClick={() => { setViewApp(!viewApp) }}>
                        앱
                        {viewApp && <DropdownApp />}
                    </ul>
                </div>
                <div className="about_img">
                    <img src={map1} />
                </div>
            </div>
        </div>
    );
}

export default ComPlace;