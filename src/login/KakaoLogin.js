import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react";
import kakaoIcon from '../img/kakao.png'
import '../css/login.css'

const KakaoLogin = () => {
    const { Kakao } = window;

    const JAVASCRIPT_APP_KEY = '030653d24e7921e0021e07867d0eda91';

    // 액세스 토큰을 상태 변수로 선언 
    // 로그인 버튼 출력 제어에 사용
    const [accessToken, setAccessToken] = useState('');

    const handlerLogin = () => {
        // 간편 로그인을 요청
        // 인증 성공 시 redirectUri 주소로 인가 코드를 전달
        Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/kakaologin'
        });
    };



    useEffect(() => {
        Kakao.init(JAVASCRIPT_APP_KEY);

        // 쿼리 스트링으로 부터 인가 코드를 추출
        const code = window.location.search.split('=')[1];
        if (code) {
            // REST API로 토큰 받기를 요청
            axios.post(
                'https://kauth.kakao.com/oauth/token', {
                grant_type: 'authorization_code',                   // 고정
                client_id: JAVASCRIPT_APP_KEY,                      // 앱 REST API 키
                redirect_uri: 'http://localhost:3000/kakaologin',   // 인가 코드가 리다이렉트된 URI
                code: code                                          // 인가 코드 받기 요청으로 얻은 인가 코드

            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }
            )
                .then(response => {
                    const accessToken = response.data.access_token;         // 사용자 액세스 토큰 값
                    setAccessToken(accessToken);


                    // 액세스 토큰 값을 할당
                    Kakao.Auth.setAccessToken(accessToken);

                    // 사용자 정보 가져오기
                    Kakao.API.request({
                        url: '/v2/user/me'
                    })
                        .then(response => {
                            // 사용자 정보 로깅
                            console.log(response);

                            // 애플리케이션에서 필요한 정보를 추출해서 로컬 스토리지에 저장
                            const { kakao_account } = response;
                            localStorage.setItem('userName', kakao_account.profile.nickname);
                            // localStorage.setItem('userNickname', kakao_account.profile.nickname);
                            // localStorage.setItem('userPhoto', kakao_account.profile.profile_image_url);


                            // const { properties } = response.kakao_account;
                            // localStorage.setItem('userName', properties.nickname);
                            // localStorage.setItem('userNickname', properties.nickname);
                            // localStorage.setItem('userPhoto', properties.profile_image_url);



                            // axios.post(`http://localhost:8080/loginFromKakao`, { userName })
                            //         .then(response => {
                            //     console.log(">>>>>>>>>>>>>>>>>>>>>>")
                            //     if (response.data) {
                            //         window.location.href = '/main';
                            //     } else {
                            //         alert('회원 가입되지 않은 상태입니다. 가입 후 로그인 해 주세요.')
                            //         window.location.href = '/regist';
                            //     }
                            // })
                            // .catch(error => {
                            //     console.log(error);
                            //     sessionStorage.clear();
                            // });
                            const userName = kakao_account.profile.nickname; // 로그인하는 사용자의 이름으로 설정
                            axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/checkUserExistence`, { userName })
                                .then(response => {
                                    if (response.data.exists) {
                                        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/loginFromSocial`, { userName })
                                            .then(response => {
                                                if (response.data) {
                                                    window.location.href = '/';
                                                }
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                sessionStorage.clear();
                                            });
                                    } else {
                                        window.location.href = '/regist';
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    sessionStorage.clear();
                                });



                            // 소셜 첫 로그인시 소셜 회원가입 화면으로 이동
                            // window.location.href = "/regist";

                            // 카카오에서 가져온 정보 중 어떤 정보를 이용해서 우리 사이트 회원을 구분할지를 정의 
                            // 카카오에서 가져온 정보를 이용해서 우리 사이트에 axios로 로그인을 시도 
                            // 이메일로 구분을 한다면, axios.post('http://localhost:8080/loginFromKakao', { email: 'test@test.com', 'name': 'hong' }).then(response => { 우리 사이트에서 주는 정보를 이용해서 사용자 처리 })
                            // 일치하는 정보가 없는 경우에는 회원 가입을 유도 => 카카오에서 제공하는 정보 외에 추가 정보를 입력하도록해서 저장



                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => console.log(error));
        }

    }, []);

    return (
        <>
            {/* https://developers.kakao.com/tool/resource/login */}
            {!accessToken &&
                <img className="login-kakao"
                    style={{ width: '30px', height: '30px' }}
                    src={kakaoIcon}
                    onClick={handlerLogin} />
            }
        </>
    );
};

export default KakaoLogin;