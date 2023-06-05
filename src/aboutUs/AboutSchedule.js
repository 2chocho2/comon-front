import { Link } from "react-router-dom/cjs/react-router-dom";
import Navi from "../Navi/Navi";
import './AboutUs.css';
import schedule from './img/schedule.png'

const AboutSchedule = ({ history }) => {

    const handlerAboutUsMain = () => {
        history.push(`/user/aboutus`)
    };

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
                <img src={schedule} />
            </div>
        </div>
    );
}
export default AboutSchedule;