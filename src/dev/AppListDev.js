import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";

const AppListDev = () => {

    const [ userIdx, setUserIdx ] = useState('');
    const [ data, setData ] = useState([]);

    useEffect(() => {
        // const token = sessionStorage.getItem('token');
        // const decode_token = jwt_decode(token);
        // setUserIdx(decode_token.sub);
        // let userIdx = decode_token.sub;
        axios.get(`http://localhost:8080/api/dev/applist/${userIdx}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    
    // 삭제 신청 요청
    const handlerClickDelete = (i) => {
        axios.put(`http://localhost:8080/api/dev/registdelete/${i}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };

    // 넘어온 데이터를 사용해 테이블 생성
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
                    <td>
                        <button onClick={ handlerClickDelete(d.imageIdx) }>삭제</button>
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

    return (
        <div>
        <div>
            <ul>
                <li><Link to='/dev/appregist'>앱 등록</Link></li>
                <li><Link to='/dev/applist'>앱 관리</Link></li>
                <li><Link to='/dev/setting'>설정</Link></li>
            </ul>
        </div>
        <div>
            <p>모든 앱</p>
            <hr />
            <table style={ styles.table }>
                <thead>
                    <tr>
                        <th>아이콘</th>
                        <th>앱 이름</th>
                        <th>상태</th>
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

export default AppListDev;