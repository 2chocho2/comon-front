import { Link } from 'react-router-dom';
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import NaviDev from '../Navi/NaviDev';
import Auth from '../admin/Auth';

const DevSetting = ({ history }) => {

    const [data, setData] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [authYn, setAuthYn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setUserId(decode_token.sub);
        let userId = decode_token.sub;
        let authIdx = decode_token.authIdx;

        if (authIdx === 3 || authIdx === 2) {
            setAuthYn(true);
        } else {
            setAuthYn(false);
        }

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/mypage/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                console.log(res);
                setData(res.data);
                setUserId(res.data.userId);
                setUserName(res.data.userName);
                setUserEmail(res.data.userEmail);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handlerChangeUserName = (e) => {
        setUserName(e.target.value);
    };

    const handlerChangeUserEmail = (e) => {
        setUserEmail(e.target.value);
    };

    const handlerClickEdit = () => {
        const newData = {
            userId: userId,
            userName: userName,
            userEmail: userEmail
        };

        axios({
            method: 'PUT',
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/mypage/edit`,
            data: newData,
            headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
        })
            .then(res => {
                console.log(res);
                alert(`정상적으로 수정되었습니다.`);
                history.push('/dev/applist');
            })
            .catch(err => {
                console.log(err);
                alert(`수정 중 오류가 발생했습니다.`);
            })
    };

    return (
        <>
            {
                authYn
                    ?
                    <div>
                        <NaviDev history={history} />
                        <div className='sidemenu_dev-box'>
                            <div className='dev_logo'></div>
                            <ul className='sidemenu_dev'>
                                <li><Link to='/dev/appregist'>앱 등록</Link></li>
                                <li><Link to='/dev/applist'>앱 관리</Link></li>
                                <li id='dev-setting'><Link to='/dev/setting'>설정</Link></li>
                            </ul>
                        </div>
                        <div className='body'>
                            <p className='body_title'>계정 설정</p>
                            <p className='body_subtitle'>개발자 계정 세부 정보</p>
                            <div className='devSetting-container'>
                                <div className='devSetting-box'>
                                    <p className='devSetting-title'>아이디</p>
                                    <input className='devSetting-input' type='text'
                                        value={userId}
                                        readOnly />
                                </div>
                                <div className='devSetting-box'>
                                    <p className='devSetting-title'>이름</p>
                                    <input className='devSetting-input' type='text'
                                        value={userName}
                                        onChange={handlerChangeUserName} />
                                </div>
                                <div className='devSetting-box'>
                                    <p className='devSetting-title'>이메일</p>
                                    <input className='devSetting-input' type='text'
                                        value={userEmail}
                                        onChange={handlerChangeUserEmail} />
                                </div>
                            </div>

                            <div className='button-box-noborder'>
                                <button id='blackButton' type='button'
                                    onClick={handlerClickEdit}>수정</button>
                            </div>
                        </div>


                    </div>
                    :
                    <Auth history={history}/>
            }

        </>
    )
}
export default DevSetting;