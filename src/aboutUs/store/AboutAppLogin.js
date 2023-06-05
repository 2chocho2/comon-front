import { Link } from "react-router-dom/cjs/react-router-dom";
import '../AboutUs.css';
import Navi from "../../Navi/Navi";
import DropdownApp from "../app/DropdownApp";
import DropdownStore from "./DropdownStore";
import { useState } from "react";
import login1 from './img/login1.PNG'
import login2 from './img/login2.PNG'
import login3 from './img/login3.PNG'
import login4 from './img/login4.PNG'
import login5 from './img/login5.PNG'
import login6 from './img/login6.PNG'
import login7 from './img/login7.PNG'
import login8 from './img/login8.PNG'


const AboutAppLogin = ({ history }) => {

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
                    <img src={login1} />
                    <hr />
                    <img src={login2} />
                    <hr />
                    <img src={login3} />
                    <hr />
                    <img src={login4} />
                    <hr />
                    <img src={login5} />
                    <hr />
                    <img src={login6} />
                    <hr />
                    <img src={login7} />
                    <hr />
                    <img src={login8} />
                </div>

            </div>
        </div>
    );
}

export default AboutAppLogin;