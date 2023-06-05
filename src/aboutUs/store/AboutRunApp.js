import { Link } from "react-router-dom/cjs/react-router-dom";
import '../AboutUs.css';
import Navi from "../../Navi/Navi";
import DropdownApp from "../app/DropdownApp";
import DropdownStore from "./DropdownStore";
import { useState } from "react";
import run1 from './img/runapp1.PNG'
import run2 from './img/runapp2.PNG'
import run3 from './img/runapp3.PNG'
import run4 from './img/runapp4.PNG'
import run5 from './img/runapp5.PNG'
import run6 from './img/runapp6.PNG'
import run7 from './img/runapp7.PNG'



const AboutRunApp = ({ history }) => {

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
            <div className='body'>
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
                    <img src={run1} />
                    <hr />
                    <img src={run2} />
                    <hr />
                    <img src={run3} />
                    <hr />
                    <img src={run4} />
                    <hr />
                    <img src={run5} />
                    <hr />
                    <img src={run6} />
                    <hr />
                    <img src={run7} />
                </div>
            </div>
        </div>
    );
}

export default AboutRunApp;