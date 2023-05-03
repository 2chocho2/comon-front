import axios from "axios";
import '../css/mypage.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import jwt_decode from "jwt-decode";
import { useMemo } from 'react';

const MyPageSide = () => {

    const [name, setName] = useState('');


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        let userId = decode_token.sub;

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/mypage/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                console.log(res);
                setName(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    // 프로필
    // const avatar = createAvatar(thumbs, {
    //     randomizeIds: false,
    //     radius: 0,
    //     scale: 200,
    //     size: 50
    // });

    // const avatar = useMemo(() => {
    //     return createAvatar(thumbs, {
    //         //   size: 128,
    //         // randomizeIds: true,
    //         radius: 0,
    //         scale: 200,
    //         size: 50,
    //         shapeColor: ["0a5b83","1c799f","69d2e7"],
    //         seed: [{name}]
    //     }).toDataUriSync();
    // }, []);


    const avatar = useMemo(() => {
        const randomName = name || `user${Math.floor(Math.random() * 10000)}`;
        return createAvatar(thumbs, {
            seed: [randomName],
            shapeColor: ["0a5b83", "1c799f", "69d2e7", "f1f4dc", "f88c49"],
            mouth: ["variant1", "variant2", "variant3", "variant4", "variant5"],
            eyes: ["variant1W10", "variant1W12", "variant1W14", "variant1W16", "variant2W10", "variant2W12", "variant2W14", "variant2W16", "variant3W10", "variant3W12", "variant3W14", "variant3W16",
                "variant4W10", "variant4W12", "variant4W14", "variant4W16", "variant5W10", "variant5W12", "variant5W14", "variant5W16", "variant6W10", "variant6W12", "variant6W14", "variant6W16", "variant7W10",
                "variant7W12", "variant7W14", "variant7W16", "variant8W10", "variant8W12", "variant8W14", "variant8W16", "variant9W10", "variant9W12", "variant9W14", "variant9W16"],
            faceOffsetY: [-15, 15],
            faceOffsetX: [-15, 15],
            // backgroundType: ["gradientLinear", "solid"],
            backgroundColor: ["b6e3f4","c0aede","d1d4f9","ffd5dc","ffdfbf"],
            scale: 120,

        }).toDataUriSync();
    }, [name]);

    return (
        <>
            <div className='mypage-side-box'>
                <p className='mypage-name'>{name}'s Profile</p>
                <img className='mypage-image' src={avatar}></img>
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