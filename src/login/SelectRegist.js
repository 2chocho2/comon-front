import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import NaviDefault from "../Navi/NaviDefault";

const SelectRegist = ({history}) => {

    // 사용자 회원가입
    const handlerUserRegist = e => {history.push('/userregist')};
    
    // 개발자 회원가입
    const handlerDevRegist = e => {history.push('/devRegist')}

    return(
        <>
            <NaviDefault history={history}/>
            <button  onClick={handlerUserRegist} >일반 사용자 회원가입</button>
            <button  onClick={handlerDevRegist} >개발자 회원가입</button>
            <div className="login-btn-box">
                                        <div className="naver-btn">
                                            <NaverLogin />
                                        </div>
                                        <div className="kakao-btn">
                                            <KakaoLogin />
                                        </div>
                                    </div>
        </>
    );
};

export default SelectRegist;