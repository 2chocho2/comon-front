import { Link } from "react-router-dom/cjs/react-router-dom";
import '../AboutUs.css';
import Navi from "../../Navi/Navi";
import DropdownApp from "../app/DropdownApp";
import DropdownStore from "./DropdownStore";
import { useState } from "react";
import detail1 from './img/appdetail1.PNG'
import detail2 from './img/appdetail2.PNG'
import detail3 from './img/appdetail3.PNG'
import detail4 from './img/appdetail4.PNG'
import download1 from './img/appdownload1.PNG'
import download2 from './img/appdownload2.PNG'
import download3 from './img/appdownload3.PNG'
import download4 from './img/appdownload4.PNG'
import download5 from './img/appdownload5.PNG'
import download6 from './img/appdownload6.PNG'
import download7 from './img/appdownload7.PNG'
import download8 from './img/appdownload8.PNG'
import download9 from './img/appdownload9.PNG'
import download10 from './img/appdownload10.PNG'
import download11 from './img/appdownload11.PNG'
import download12 from './img/appdownload12.PNG'
import download13 from './img/appdownload13.PNG'
import download14 from './img/appdownload14.PNG'
import download15 from './img/appdownload15.PNG'
import download16 from './img/appdownload16.PNG'





const AboutAppDetail = ({ history }) => {

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
                    <img src={detail1} />
                    <hr />
                    <img src={detail2} />
                    <hr />
                    <img src={detail3} />
                    <hr />
                    <img src={detail4} />
                    <hr />
                    <img src={download1} />
                    <hr />
                    <img src={download2} />
                    <hr />
                    <img src={download3} />
                    <hr />
                    <img src={download4} />
                    <hr />
                    <img src={download5} />
                    <hr />
                    <img src={download6} />
                    <hr />
                    <img src={download7} />
                    <hr />
                    <img src={download8} />
                    <hr />
                    <img src={download9} />
                    <hr />
                    <img src={download10} />
                    <hr />
                    <img src={download11} />
                    <hr />
                    <img src={download12} />
                    <hr />
                    <img src={download13} />
                    <hr />
                    <img src={download14} />
                    <hr />
                    <img src={download15} />
                    <hr />
                    <img src={download16} />
                </div>
            </div>
        </div>
    );
}

export default AboutAppDetail;