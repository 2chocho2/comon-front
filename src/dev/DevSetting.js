import {Link} from 'react-router-dom';
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const DevSetting = ({ history }) => {

    const [ data, setData ] = useState('');
    const [ devId, setDevId ] = useState('');
    const [ devName, setDevName ] = useState('');
    const [ devEmail, setDevEmail ] = useState('');
    

    useEffect(() => {
        //TODO! 현재 하드 코딩 상태. 수정 필요.
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/mypage/chocho`)
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
            data: newData
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
                <ul className='sidemenu_link'>
                    <li><Link to='/dev/appregist'>앱 등록</Link></li>
                    <li><Link to='/dev/applist'>앱 관리</Link></li>
                    <li><Link to='/dev/setting'>설정</Link></li>
                </ul>
            </div>
            <div className='body'>
                <p>아이디</p>
                <input type='text'
                        value={devId}
                        readOnly />
                <hr />
                <p>이름</p>
                <input type='text'
                        value={devName}
                        onChange={ handlerChangeDevName } />
                <hr />
                <p>이메일</p>
                <input type='text'
                        value={devEmail}
                        onChange={ handlerChangeDevEmail } />
                <hr />
                <p>주소</p>
                <p>{data.address1}</p>
                <p>{data.address2}</p>
                <p>{data.address3}</p>

                <button type='button'
                    onClick={ handlerClickEdit }>수정</button>
            </div>

            
        </div>
        </>
    )
}
export default DevSetting;