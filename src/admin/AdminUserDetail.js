import { useEffect, useState } from "react";
import NaviAdmin from "../Navi/NaviAdmin";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Auth from './Auth';


const AdminUserDetail = ({ history, match }) => {

    const { userId } = match.params;
    const [data, setData] = useState([]);

    useEffect(() => {

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/myservice/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handlerClickList = () => {
        history.push(`/admin/setting`);
    };

    // 넘어온 데이터를 사용해 테이블 생성
    const createTable = () => {
        return data.map((d, index) => {
            return (
                <>
                    <tr>
                        <td><img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${d.iconImage}`} style={{ width: '80px', height: '80px' }} /></td>
                        <td>{d.imageName}</td>
                        <td>{d.userName}</td>
                        <td>{d.springbootPort}</td>
                        <td>{d.reactPort}</td>
                    </tr>
                </>
            )
        }
        )
    };

    return (
        <>

            <>
                <NaviAdmin history={history} />

                <div className='sidemenu_admin-box'>
                    <div className='admin_logo'></div>
                    <ul className='sidemenu_admin'>

                        <li id='admin-setting'><Link to='/admin/setting'>회원 관리</Link></li>
                        <li><Link to='/admin'>모든 앱</Link></li>
                        <li><Link to='/admin/judge'>심사</Link></li>
                    </ul>
                </div>
                <div className='body'>
                    <p className='body_title'>사용 중인 앱-{userId}
                        <button type='button'
                            onClick={handlerClickList}>목록으로</button></p>
                    <table className='AppTable'>
                        <colgroup>
                            <col width="15%" />
                            <col width="21%" />
                            <col width="21%" />
                            <col width="21%" />
                            <col width="21%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>앱 아이콘</th>
                                <td>앱 이름</td>
                                <td>앱 제공사</td>
                                <td>서버 포트</td>
                                <td>엔드포인트 포트</td>
                            </tr>
                        </thead>
                        <tbody>
                            {createTable()}
                        </tbody>
                    </table>
                </div>
            </>
        </>
    );
}

export default AdminUserDetail;