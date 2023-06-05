import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import NaviDefault from "../Navi/NaviDefault";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import NaverRegist from "./NaverRegist";
import Swal from "sweetalert2";

const SelectUserRegist = ({ history }) => {

    // 사용자 회원가입
    const handlerUserRegist = e => { history.push('/userregist') };

    const handlerClickSocial = () => {
        Swal.fire({text: '현재 소셜 로그인 사용이 불가합니다. 사이트 회원 가입을 이용해 주세요.'})
    };

    return (
        <>
            <div id="my-container">
                <NaviDefault history={history} />
                <div className='select-register-bg' />
                <div className='select-register-container'>
                    <div className="select-register-box">
                        <div className="login-header">
                            <div className="round1" />
                            <div className="round2" />
                            <div className="round3" />
                        </div>

                        <div className='select-user-register-body'>
                            <div className='title'>
                                <p>Hello! Regist!!!^_____^</p>
                                <p>COM:ON USER</p>
                            </div>

                            <div className='user-register-btn' onClick={handlerUserRegist} >사용자 회원가입</div>

                            <div className="register-naver-btn-box" onClick={handlerClickSocial}>
                                <div className="select-naver-btn">
                                    {/* <NaverLogin /> */}
                                    </div>
                                <div className="select-naver-tag" >
                                    <SiNaver className="select-naver-icon" />
                                    <span>네이버 회원가입</span>
                                </div>
                            </div>

                            <div className="register-kakao-btn-box" onClick={handlerClickSocial}>
                                <div className="select-kakao-btn" >
                                    {/* <KakaoLogin /> */}
                                    </div>
                                <div className="select-kakao-tag">
                                    <RiKakaoTalkFill className="select-kakao-icon" />
                                    <span>카카오 회원가입</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectUserRegist;