import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';

const AppListDev = ({ history }) => {

    const [userId, setUserId] = useState('');
    const [data, setData] = useState([]);
    const [denyList, setDenyList] = useState([]);

    useEffect(() => {
        // const token = sessionStorage.getItem('token');
        // const decode_token = jwt_decode(token);
        // setUserId(decode_token.sub);
        // let userId = decode_token.sub;
        
        //TODO! 하드 코딩 상태. 이후 수정 필요
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/applist/chocho`)
            .then(res => {
                setData(res.data.list1);
                setDenyList(res.data.list2);
                console.log(res.data.list2);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    // 삭제 신청 요청
    // const handlerClickDelete = (i) => {
    //     axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/registdelete/${i}`)
    //         .then(res => {
    //             console.log(res.data);
    //             alert('삭제 요청이 완료되었습니다.')
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // };

    const handlerClickDelete = (i) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/dev/registdelete/${i}`)
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
                        {statusName} <br />
                        <p className="denyCode">{denyName}</p>
                    </td>
                    <td>
                        {d.statusIdx === 4 ? (
                            <button onClick={() => handlerClickDelete(d.imageIdx)}>삭제 요청</button>
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
                <ul className='sidemenu_link'>
                    <li><Link to='/dev/appregist'>앱 등록</Link></li>
                    <li><Link to='/dev/applist'>앱 관리</Link></li>
                    <li><Link to='/dev/setting'>설정</Link></li>
                </ul>
            </div>
            <div className='body'>
                <p className='body_title'>모든 앱</p>
                <hr />
                <p>{userId}</p>
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