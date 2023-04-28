import axios from "axios";
import '../css/mypage.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const MyPageSide = () => {

    const [name, setName] = useState('');
    const userId = 'chochocho';

    useEffect(() => {
        // TODO! 현재 하드 코딩


        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/mypage/${userId}`,
        { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
            .then(res => {
                console.log(res);
                setName(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <div className='mypage-side-box'>
                <p className='mypage-name'>{name}'s Profile</p>
                <div className='mypage-image'></div>
                <ul className='mypage-side-link'>
                    <li><Link to='/mypage'>사용 중인 서비스</Link></li>
                    <li><Link to='/mypage/qna'>나의 문의 내역</Link></li>
                    <li><Link to='/mypage/edit'>회원 정보 변경</Link></li>
                </ul>
            </div>
        </>
    );
}
export default MyPageSide;