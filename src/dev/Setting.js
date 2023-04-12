import {Link} from 'react-router-dom';

const Setting = () => {
    return (
        <>
        <div>
            <div>
                <ul>
                    <li><Link to='/dev/appregist'>앱 등록</Link></li>
                    <li><Link to='/dev/applist'>앱 관리</Link></li>
                    <li><Link to='/dev/setting'>설정</Link></li>
                </ul>
            </div>

        </div>
        </>
    )
}
export default Setting;