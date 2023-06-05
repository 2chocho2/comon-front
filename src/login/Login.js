import { useState, useEffect } from "react";
import axios from "axios";
import NaverLogin from "./NaverLogin";
import KakaoLogin from "./KakaoLogin";
import NaviDefault from "../Navi/NaviDefault";
import '../css/login.css'
import { BiShowAlt, BiHide } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import jwtDecode from "jwt-decode";

const Login = ({ history }) => {

    // 변수 선언 
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    // const [passwordOption, setPasswordOption] = useState(false);

    // 핸들러 정의
    const handlerChangeUserId = e => setUserId(e.target.value);
    const handlerChangeUserPassword = e => setUserPassword(e.target.value);
    const handlerRegist = () => { history.push('/regist'); };

    //  비밀번호 옵션 설정
    const [hidePassword, setHidePassword] = useState(true);
    const toggleHidePassword = () => {
        setHidePassword(!hidePassword);
    }

    //소셜 로그인
    useEffect(() => {
        // 로컬 스토리지에 userName이 존재하는 경우 로그인한 것으로 판단
        // 이미 로그인한 경우 홈(/)으로 이동
        const isLogin = !!window.localStorage.getItem('userName');
        if (isLogin) {
            
            console.log("I'm here !!!!!!!!!!!!!!!!!!!!!!!!!!")

            const userName = window.localStorage.getItem('userName')
            axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/checkUserExistence`, { userName })
                 .then(response => {
                    if (response.data.exists) {
                        window.opener.location.href = "/";
                    } else {
                        window.opener.location.href = "/userregist";
                    }
                 })
                 .catch(error => console.log(error));
        }
    }, []);

    const handlerOnClick = e => {
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/login`, { userId, userPassword })
            .then(response => {
                const token = response.data;
                const decode_token = jwtDecode(token);

                console.log(decode_token);
                if (response.data) {
                    if(decode_token.deleteYn == 'Y') {
                        Swal.fire({ text: `탈퇴한 경우 접속이 불가합니다.` });
                        sessionStorage.clear();
                        localStorage.clear();
                        setUserId('');
                        setUserPassword('');
                        return;
                    } else {
                        sessionStorage.setItem("token", response.data);
                        history.push('/');
                    }
                
                } else {
                    Swal.fire({ text: `ID, PW가 일치하지 않습니다. 확인 후 다시 시도해주세요.` });
                    sessionStorage.clear();
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({ text: `ID, PW가 일치하지 않습니다. 확인 후 다시 시도해주세요.` });
                sessionStorage.clear();
            });
    };

    const handlerClickSocial = () => {
        Swal.fire({text: '현재 소셜 로그인 사용이 불가합니다. 사이트 회원 가입을 이용해 주세요.'})
    };

    return (
        <>
            <ToastContainer />
            <div id="my-container">
                <NaviDefault history={history} />
                <div className="login-bg">
                    <div className="login-container">
                        <div className="login-box">
                            <div className="login-header">
                                <div className="round1" />
                                <div className="round2" />
                                <div className="round3" />
                            </div>

                            <div className="login-body">
                                <div className="rotate-box">
                                    <div className="rotation-text" />
                                    <div className="login-logo" />
                                </div>

                                <div className="login-content">
                                    <div className="login-content-title">
                                        <p>Hello! COM:ON!!</p>
                                        <p>User</p>
                                    </div>

                                    <input className='login-id'
                                        type="text"
                                        value={userId}
                                        placeholder="아이디를 입력하세요."
                                        onChange={handlerChangeUserId} />
                                    <br />

                                    <div className='login-pwd-input'>
                                        <input className='login-pwd'
                                            type={hidePassword ? "password" : "text"}
                                            placeholder="비밀번호를 입력하세요."
                                            value={userPassword}
                                            onChange={handlerChangeUserPassword} />
                                        <div className="login-pwd-show">
                                            {hidePassword ? (
                                                <BiShowAlt onClick={toggleHidePassword} />
                                            ) : (
                                                <BiHide onClick={toggleHidePassword} />
                                            )}
                                        </div>
                                    </div>

                                    {/* 아이디, 비밀번호 두개다 입력했을 때 색깔 변화 */}
                                    <section>
                                        <button className="loginBtn"
                                            onClick={handlerOnClick}
                                            type="submit"
                                            // buttonType={buttonType.ACTIVATION}
                                            // disabled가 버튼 활성화를 설정 - 2개의 값이 다 들어가야 함
                                            disabled={!(userId && userPassword)}>
                                            로그인
                                        </button>
                                    </section>

                                    <button className='register-btn' onClick={handlerRegist}>아이디가 없으신가요?</button>
                                </div>

                                <div className="social-login-box">
                                    <p>소셜 로그인</p>
                                    {/* 다양한 방식의 로그인 컴포넌트를 추가 */}
                                    <div className="login-btn-box">
                                        <div className="naver-btn" onClick={handlerClickSocial}>
                                            {/* <NaverLogin /> */}
                                            <div className="naver-btn-bg">
                                                <SiNaver className="user-naver-icon" />
                                            </div>
                                        </div>

                                        <div className="kakao-btn" onClick={handlerClickSocial}>
                                            {/* <KakaoLogin /> */}
                                            <div className="kakao-btn-bg">
                                                <RiKakaoTalkFill className="user-kakao-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
