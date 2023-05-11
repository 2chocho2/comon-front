import NaviDefault from '../Navi/NaviDefault';
import { FaUserAstronaut, FaUserLock } from "react-icons/fa";
import '../css/login.css';

const SelectLogin = ({history}) => {
    
    const handlerDev = () => {history.push('/devlogin')};

    const handlerUser = () => {history.push('/userlogin')};

    return (
        <>
            <div id="my-container">
                <NaviDefault />
                <div className="login-bg">
                    <div className="login-container">
                        <div className="login-box">
                            <div className="login-header">
                                <div className="round1" />
                                <div className="round2" />
                                <div className="round3" />
                            </div>
                            <div className="select-login-body">
                                <div className="select-login-content">
                                    <p className='select-login-title'> HELLO! COM:ON!!:) </p>
                                    <div className='select-login-box'>
                                        <div className="select-dev-loginBtn" onClick={handlerDev} type="submit">
                                            <FaUserAstronaut id='dev-login-btn' />
                                            <p>개발자 로그인</p>
                                        </div>
                                        <div className="select-user-loginBtn" onClick={handlerUser} type="submit">
                                            <FaUserLock id='user-login-btn' />
                                            <p>사용자 로그인</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SelectLogin;