import { Link } from 'react-router-dom';
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

const DevSetting = ({ history }) => {

    const [data, setData] = useState('');
    const [devId, setDevId] = useState('');
    const [devName, setDevName] = useState('');
    const [devEmail, setDevEmail] = useState('');


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setDevId(decode_token.sub);
        let devId = decode_token.sub;

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/mypage/${devId}`,
        { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
            .then(res => {
                console.log(res);
                setData(res.data);
                setDevId(res.data.devId);
                setDevName(res.data.devName);
                setDevEmail(res.data.devEmail);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handlerChangeDevName = (e) => {
        setDevName(e.target.value);
    };

    const handlerChangeDevEmail = (e) => {
        setDevEmail(e.target.value);
    };

    const handlerClickEdit = () => {
        const newData = {
            devId: devId,
            devName: devName,
            devEmail: devEmail
        };

        axios({
            method: 'PUT',
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/mypage/edit`,
            data: newData,
            headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}
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
            <div>
                <NaviAdmin />
                <div className='sidemenu'>
                    <div className='dev_logo'></div>
                    <ul className='sidemenu_link'>
                        <li><Link to='/dev/appregist'>앱 등록</Link></li>
                        <li><Link to='/dev/applist'>앱 관리</Link></li>
                        <li id='setting'><Link to='/dev/setting'>설정</Link></li>
                    </ul>
                </div>
                <div className='body'>
                    <p className='body_title'>계정 설정</p>
                    <p className='body_subtitle'>개발자 계정 세부 정보</p>
                    <div className='devSetting-container'>
                        <div className='devSetting-box'>
                            <p className='devSetting-title'>아이디</p>
                            <input className='devSetting-input' type='text'
                                value={devId}
                                readOnly />
                        </div>
                        <div className='devSetting-box'>
                            <p className='devSetting-title'>이름</p>
                            <input className='devSetting-input' type='text'
                                value={devName}
                                onChange={handlerChangeDevName} />
                        </div>
                        <div className='devSetting-box'>
                            <p className='devSetting-title'>이메일</p>
                            <input className='devSetting-input' type='text'
                                value={devEmail}
                                onChange={handlerChangeDevEmail} />
                        </div>
                    </div>

                    <div className='button-box-noborder'>
                        <button id='blackButton' type='button'
                            onClick={handlerClickEdit}>수정</button>
                    </div>
                </div>


            </div>
        </>
    )
}
export default DevSetting;