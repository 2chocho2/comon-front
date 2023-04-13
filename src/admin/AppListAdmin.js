import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const AppListAdmin = () => {

    const [ data, setData ] = useState([]);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const createTable = (data) => {
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
            return (
                <tr key={index}>
                    <td>{d.iconImage}</td>
                    <td>{d.ImageName}</td>
                    <td>{statusName}</td>
                    <td>{d.userName}</td>
                    <td>
                        <button>삭제</button>
                    </td>
                </tr>
            )
        })
    };

    const styles = {
        table: {
            width: '80%',
            border: '1px solid black'
        }
    };

    // 전체 앱 리스트 조회
    const handlerClickAll = () => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };

    // 서비스 중인 앱 리스트 조회
    const handlerClickOnService = () => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/onservice`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };

    // 삭제 신청 상태의 앱 리스트 조회
    const handlerClickRegistDelete = () => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/registdelete`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };

    // 삭제된 앱 리스트 조회
    const handlerClickDeleteService = () => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/deleteapplist`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div>
        <div>
            <ul>
                <li><Link to='/dev/appregist'>앱 등록</Link></li>
                <li><Link to='/dev/applist'>앱 관리</Link></li>
                <li>설정</li>
                <li><Link to='/admin'>모든 앱</Link></li>
                <li><Link to='/admin/judge'>심사</Link></li>
            </ul>
        </div>
        <div>
            <p>모든 앱</p>
            <hr />
            <ul>
                <li onClick={ handlerClickAll }>전체 보기</li>
                <li onClick={ handlerClickOnService }>서비스 중</li>
                <li onClick={ handlerClickRegistDelete }>삭제 신청</li>
                <li onClick={ handlerClickDeleteService }>서비스 종료</li>
            </ul>
            <table style={ styles.table }>
                <thead>
                    <tr>
                        <th>아이콘</th>
                        <th>앱 이름</th>
                        <th>상태</th>
                        <th>서비스 제공사</th>
                        <th>삭제 요청</th>
                    </tr>
                </thead>
                <tbody>
                    {createTable}
                </tbody>

            </table>
        </div>
            
    </div>   
    )
}

export default AppListAdmin;