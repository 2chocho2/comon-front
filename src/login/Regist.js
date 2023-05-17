import { Router, withRouter } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import NaviDefault from '../Navi/NaviDefault';
import '../css/login.css';
import Swal from 'sweetalert2';

const Regist = ({ history }) => {

    // 변수 선언
    const [userId, setUserId] = useState('');                            // 아이디
    const [userPassword, setUserPassword] = useState('');                // 비밀번호 및 비밀번호 확인
    const [userPasswordCheck, setUserPasswordCheck] = useState('');
    const [userName, setUserName] = useState('');                        // 이름
    const [userEmail, setUserEmail] = useState('');                      // 이메일
    const [userPhoneNumber, setUserPhoneNumber] = useState('');           // 전화번호

    // 오류 메시지 상태 저장
    const [userEmailMessage, setUserEmailMessage] = useState('');                 // 이메일 메시지
    const [userPasswordCheckMessage, setUserPasswordCheckMessage] = useState(''); // 비밀번호 확인 메시지

    //유효성 검사
    const [isEmail, setIsEmail] = useState(false);                   // 이메일
    const [isPasswordCheck, setIsPasswordCheck] = useState(false);   // 비밀번호 확인
    const [passwordOption, setPasswordOption] = useState(false);     // 비밀번호 옵션

    // 비밀번호 옵션 설정
    const [passwordInputType, setPasswordInputType] = useState({
        type: "password",
        autoComplete: "current-password",
    });

    useEffect(() => {
        // 소셜 첫 로그인 후 로컬 스토리지에 userName이 존재하는 경우 
        const isName = !!window.localStorage.getItem('userName');
        if (isName) {
            setUserName(window.localStorage.getItem('userName'));
        }
    }, []);

    useEffect(() => {
        if (passwordOption === false)
            setPasswordInputType({
                type: "password",
                autoComplete: "current-password",
            });
        else
            setPasswordInputType({
                type: "text",
                autoComplete: "off"
            });
    }, [passwordOption])

    // 핸들러
    const handlerChangeUserId = e => setUserId(e.target.value);

    // 이름 핸들러 정의
    const handlerChangeUserName = e => setUserName(e.target.value);

    // 이메일 핸들러 정의
    const handlerChangeUserEmail = useCallback((e) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setUserEmail(emailCurrent)
        if (!emailRegex.test(emailCurrent)) {
            setUserEmailMessage('이메일 형식이 올바르지 않습니다. 다시 확인해주세요.')
            setIsEmail(false)
        } else {
            setUserEmailMessage('올바른 이메일 형식입니다.')
            setIsEmail(true)
        }
    }, [])

    // 비밀번호 핸들러 정의
    const handlerChangeUserPassword = e => setUserPassword(e.target.value);

    // 비밀번호 확인 핸들러 정의
    const handlerChangeUserPasswordCheck = useCallback((e) => {
        const passwordCheckCurrent = e.target.value
        setUserPasswordCheck(passwordCheckCurrent)
        if (userPassword === passwordCheckCurrent) {
            setUserPasswordCheckMessage('비밀번호가 일치합니다.')
            setIsPasswordCheck(true)
        } else {
            setUserPasswordCheckMessage('비밀번호가 일치하지 않습니다. 다시 확인해주세요.')
            setIsPasswordCheck(false)
        }
    }, [userPassword])

    // 전화번호 핸들러 정의
    const handlerChangeUserPhoneNumber = e => {
        const before = e.target.value.replaceAll('-', '');

        // 숫자 여부 체크
        let numberFormat = before.replace(/[^0-9]/g, '');

        // 길이에 따라서 짤라서 포맷팅 
        if (numberFormat.length < 3) {
            numberFormat = numberFormat.substr(0, 3);
        } else if (numberFormat.length > 4 && numberFormat.length < 8) {
            numberFormat = numberFormat.substr(0, 3) + '-' + numberFormat.substr(3, 4);
        } else if (numberFormat.length >= 8) {
            numberFormat = numberFormat.substr(0, 3) + '-' + numberFormat.substr(3, 4) + '-' + numberFormat.substr(7, 4);
        }

        setUserPhoneNumber(numberFormat);
    }

    // 회원가입 값 푸쉬 버튼
    const handlerOnClick = e => {
        e.preventDefault();

        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/regist`,
            { userId, userName, userPassword, userPhoneNumber: userPhoneNumber.replaceAll('-', ''), userEmail, authIdx: '1' })
            .then(response => {
                if (response.data) {
                    Swal.fire({text:`정상적으로 가입 되었습니다. 로그인 페이지로 이동합니다.`});
                    history.push('/login');
                    localStorage.clear();
                    sessionStorage.clear();
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({text:`확인 후 다시 시도해주세요.`});
                sessionStorage.clear();
            });
    };

    return (
        <>
            <div id="my-container">
                <NaviDefault history={history}/>
                <div className='register-bg' />
                <div className='register-container'>
                    <div className='register-box'>
                        <div className="login-header">
                            <div className="round1" />
                            <div className="round2" />
                            <div className="round3" />
                        </div>

                        <div className='register-body'>
                            <div className='title'>
                                <p>Hello! Regist!!!^_____^</p>
                                <p>User</p>
                            </div>

                            <div className='input-register'>
                                <label><span style={{ color: 'red' }}>*</span> 아이디</label>
                                <input type="text" value={userId} onChange={handlerChangeUserId}
                                    placeholder="아이디를 입력하세요." />
                            </div>

                            <div className='input-register'>
                                <label><span style={{ color: 'red' }}>*</span> 비밀번호</label>
                                <input type={passwordInputType.type} onChange={handlerChangeUserPassword}
                                    id="password"
                                    password="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
                                    title="비밀번호"
                                    placeholder="비밀번호를 입력하세요"
                                    value={userPassword}
                                    autoComplete={passwordInputType.autoComplete}
                                />
                            </div>

                            <div className='checked-box'>
                                <div className='input-pwdChecked'>
                                    <label><span style={{ color: 'red' }}>*</span> 비밀번호 확인</label>
                                    <input type={passwordInputType.type}
                                        onChange={handlerChangeUserPasswordCheck}
                                        title="비밀번호 확인"
                                        placeholder="비밀번호를 한번 더 입력하세요."
                                        value={userPasswordCheck}
                                        autoComplete={passwordInputType.autoComplete}
                                    />
                                    {userPasswordCheck.length > 0 && (
                                        <p className={`message ${isPasswordCheck ? 'success' : 'error'}`}>{userPasswordCheckMessage}</p>
                                    )}
                                </div>

                                <p className="checkbox-item">
                                    <input id="showPwd-check"
                                        type="checkbox"
                                        checked={passwordOption}
                                        onChange={() => setPasswordOption(!passwordOption)}
                                    />
                                    <label><span>비밀번호 표시</span></label>
                                </p>
                            </div>

                            <div className='input-register'>
                                <label><span style={{ color: 'red' }}>*</span> 이름</label>
                                <input type="text" text="이름" value={userName} onChange={handlerChangeUserName}
                                    placeholder="이름을 입력하세요." />
                            </div>

                            <div className='input-email'>
                                <label><span style={{ color: 'red' }}>*</span> 이메일</label>
                                <input type="email" text="이메일" value={userEmail} onChange={handlerChangeUserEmail}
                                    placeholder="이메일을 입력하세요." />
                                {userEmail.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{userEmailMessage}</span>
                                }
                            </div>

                            <div className='input-register'>
                                <label><span style={{ color: 'red' }}>*</span> 전화번호</label>
                                <input type="text" text="전화번호" value={userPhoneNumber} onChange={handlerChangeUserPhoneNumber}
                                    placeholder="전화번호를 입력하세요." />
                            </div>

                            <section>
                                <button className="registerCheck-btn"
                                    onClick={handlerOnClick}
                                    type="submit"
                                    disabled={!(userId && userPassword && isPasswordCheck && isEmail && userName && userPhoneNumber)}>
                                    회원가입
                                </button>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Regist;