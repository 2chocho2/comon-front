import { Link } from "react-router-dom/cjs/react-router-dom";

const DropdownApp = () => {

    return (
        <div>
            <ul className="about_drop_list">
                <li><Link to='/user/about/habittracker'>Habit Tracker</Link></li>
                <li><Link to='/user/about/calculator'>연차&연봉 계산기</Link></li>
                <li><Link to='/user/about/complace'>com Place</Link></li>
                <li><Link to='/user/about/logon'>Log On</Link></li>
                <li><Link to='/user/about/tetris'>테트리스</Link></li>
                <li><Link to='/user/about/dictionary'>슬기로운 회사생활</Link></li>
                <li><Link to='/user/about/news'>COM:ONEWS</Link></li>
                <li><Link to='/user/about/onday'>Onday Schedule</Link></li>
                <li><Link to='/user/about/spellcheck'>맞춤법 검사기</Link></li>
            </ul>
        </div>
    );
}

export default DropdownApp;