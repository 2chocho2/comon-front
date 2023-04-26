import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react";

const KakaoLogin = () => {
    const { Kakao } = window;

    const JAVASCRIPT_APP_KEY = 'be837b733c72053ebc27ab95eea89861';
    
    // 액세스 토큰을 상태 변수로 선언 
    // 로그인 버튼 출력 제어에 사용
    const [accessToken, setAccessToken] = useState('');

    const handlerLogin = () => {
        // 간편 로그인을 요청
        // 인증 성공 시 redirectUri 주소로 인가 코드를 전달
        Kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/kakaoLogin'
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
                    redirect_uri: 'http://localhost:3000/kakaoLogin',   // 인가 코드가 리다이렉트된 URI
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
                    localStorage.setItem('userNickname', kakao_account.profile.nickname);
                    localStorage.setItem('userPhoto', kakao_account.profile.profile_image_url);

                    // 소셜 첫 로그인시 소셜 회원가입 화면으로 이동
                    window.location.href = "/";
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
            { !accessToken && 
                <img style={{width: 277, height: 60, cursor: 'pointer'}} 
                     src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_wide.png" 
                     onClick={handlerLogin} /> 
            }
        </>
    );
};

export default KakaoLogin;