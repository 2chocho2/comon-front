import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import NaviAdmin from '../Navi/NaviAdmin';
import { FaUserAstronaut } from "react-icons/fa";
import '../css/dev.css';

const AppListDev = ({ history }) => {

    const [devId, setDevId] = useState('');
    const [data, setData] = useState([]);
    const [denyList, setDenyList] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setDevId(decode_token.sub);
        let devId = decode_token.sub;

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/applist/${devId}`,
        { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
            .then(res => {
                setData(res.data.list1);
                setDenyList(res.data.list2);
                console.log(res.data.list1);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handlerClickDelete = (i) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/registdelete/${i}`,
            { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
                .then(res => {
                    console.log(res.data);
                    alert('삭제 요청이 완료되었습니다.')
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            history.push('/dev/applist');
        }
    };

    // 넘어온 데이터를 사용해 테이블 생성
    const createTable = () => {
        return data.map((d, index) => {
            let statusName = '';
            if (d.statusIdx == '1') {
                statusName = '등록';
            } else if (d.statusIdx == '2') {
                statusName = '심사 중';
            } else if (d.statusIdx == '3') {
                statusName = '심사 거절';
            } else if (d.statusIdx == '4') {
                statusName = '출시';
            }

            let denyName = '';
            if (d.denyIdx == '1') {
                denyName = '이미지 규격이 맞지 않음';
            } else if (d.denyIdx == '2') {
                denyName = '볼륨 설정이 옳지 않음.';
            } else if (d.denyIdx == '3') {
                denyName = '실행을 위한 이미지가 존재하지 않음.';
            } else if (d.denyIdx == '4') {
                denyName = '실행 파일(docker-compose.yaml) 형식이 맞지 않음.';
            } else if (d.denyIdx == '5') {
                denyName = '실행 포트가 올바르게 설정되지 않음.'
            } else if (d.denyIdx == '0') {
                denyName = '';
            }

            return (
                <tr key={index}>
                    <td><img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${d.iconImage}`} /></td>
                    <td>{d.imageName}</td>
                    <td>
                        <p style={{ fontSize: 16, height: 20}}>{statusName}</p>
                        <p className="denyCode">{denyName}</p>
                    </td>
                    <td>
                        {d.statusIdx === 4 ? (
                            <button id='deleteRqButton' onClick={() => handlerClickDelete(d.imageIdx)}>삭제 요청</button>
                        ) : d.statusIdx === 5 ? (
                            <p>삭제 신청 진행 중</p>
                        ) : d.statusIdx === 6 ? (
                            <p>삭제됨</p>
                        ) : null}
                    </td>
                </tr>
            )
        })
    };

    
    return (
        <div>
            <NaviAdmin />
            <div className='sidemenu'>
                <div className='dev_logo'></div>
                <ul className='sidemenu_link'>
                    <li><Link to='/dev/appregist'>앱 등록</Link></li>
                    <li id='setting'><Link to='/dev/applist'>앱 관리</Link></li>
                    <li><Link to='/dev/setting'>설정</Link></li>
                </ul>
            </div>
            <div className='body'>
                <p className='body_title'>모든 앱</p>

                <p className='userName'><FaUserAstronaut className='userIcon' title='유저 아이디입니다.'/>{devId}</p>
                <table className='AppTable'>
                    <thead>
                        <tr>
                            <th>아이콘</th>
                            <th>앱 이름</th>
                            <th>상태</th>
                            <th>삭제 요청</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createTable()}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default AppListDev;