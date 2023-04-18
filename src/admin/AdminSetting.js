import { Link } from 'react-router-dom';
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSetting = () => {

    const [userData, setUserData] = useState([]);
    const [devData, setDevData] = useState([]);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/setting`)
            .then(res => {
                console.log(res);
                setUserData(res.data.userList);
                setDevData(res.data.devList);
                console.log(res.data.devList);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handlerClickDev = () => {
        setUserData(null);
        setDevData(null);

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/setting`)
            .then(res => {
                setDevData(res.data.devList);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handlerClickUser = () => {
        setUserData(null);
        setDevData(null);

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/setting`)
            .then(res => {
                setUserData(res.data.userList);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <>
            <div>
                <NaviAdmin />
                <div className='sidemenu'>
                    <ul className='sidemenu_link'>
                        <li><Link to='/dev/appregist'>앱 등록</Link></li>
                        <li><Link to='/dev/applist'>앱 관리</Link></li>
                        <li><Link to='/admin/setting'>회원 관리</Link></li>
                        <li><Link to='/admin'>모든 앱</Link></li>
                        <li><Link to='/admin/judge'>심사</Link></li>
                    </ul>
                </div>
                <div className='body'>
                    <button type='button'
                        onClick={handlerClickUser}> 사용자 </button>
                    <button type='button'
                        onClick={handlerClickDev}> 개발자 </button>
                    <table className='AppTable'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <td>NAME</td>
                                <td>E-MAIL</td>
                                <td>AUTH</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData &&
                                userData.map(data => {
                                    return (
                                        <tr key={data.userIdx}>
                                            <td>{data.userId}</td>
                                            <td>{data.userName}</td>
                                            <td>{data.userEmail}</td>
                                            <td>
                                                {data.authIdx === 1 ? (
                                                    <p>Admin</p>)
                                                    :
                                                    (<p>사용자</p>
                                                    )}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {
                                devData &&
                                devData.map(data => {
                                    return (
                                        <tr key={data.devIdx}>
                                            <td>{data.devId}</td>
                                            <td>{data.devName}</td>
                                            <td>{data.devEmail}</td>
                                            <td>개발자</td>
                                        </tr>
                                    )
                                })
                            }



                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default AdminSetting;