import { Link } from "react-router-dom/cjs/react-router-dom";

const DropdownStore = () => {

    return (
        <div>
            <ul className="about_drop_list">
                <li><Link to='/user/about/login'>로그인/회원가입</Link></li>
                <li><Link to='/user/about/appdetail'>앱 별 상세 페이지 - 다운로드</Link></li>
                <li><Link to='/user/about/runapp'>앱 실행</Link></li>
                <li><Link to='/user/about/appregist'>앱 등록</Link></li>
            </ul>
        </div>
    );
}

export default DropdownStore;