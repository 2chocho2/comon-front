import { Router, withRouter } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

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
    const handlerChangeUserPhoneNumber = e => setUserPhoneNumber(e.target.value);

    // 회원가입 값 푸쉬 버튼
    const handlerOnClick = e => {
        e.preventDefault();

        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/regist`,
            { userId, userName, userPassword, userPhoneNumber, userEmail })
            .then(response => {
                console.log(response);
                if (response.data) {
                    alert('정상적으로 가입 되었습니다. 로그인 페이지로 이동합니다.')
                    history.push('/login');
                }
            })
            .catch(error => {
                console.log(error);
                alert('확인 후 다시 시도해주세요.')
                sessionStorage.clear();
            });
    };

    return (
        <>
            <div>
                <h1>회원가입</h1>
                <p>아이디 : <input type="text" value={userId} onChange={handlerChangeUserId} /></p>
                <p>비밀번호 :
                    <input type={passwordInputType.type} onChange={handlerChangeUserPassword}
                        id="password"
                        password="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
                        title="비밀번호"
                        placeholder="숫자,영문자,특수문자 조합으로 8자리"
                        value={userPassword}
                        autoComplete={passwordInputType.autoComplete}
                    />

                </p>
                <p>비밀번호 확인 :
                    <input type={passwordInputType.type}
                        onChange={handlerChangeUserPasswordCheck}
                        title="비밀번호 확인"
                        placeholder="비밀번호를 한번 더 입력하세요."
                        value={userPasswordCheck}
                        autoComplete={passwordInputType.autoComplete}
                    />
                    {userPasswordCheck.length > 0 && (
                        <span className={`message ${isPasswordCheck ? 'success' : 'error'}`}>{userPasswordCheckMessage}</span>
                    )}
                </p>
                <span className="checkbox-item">
                    <input
                        type="checkbox"
                        checked={passwordOption}
                        onChange={() => setPasswordOption(!passwordOption)}
                    />
                    <label>
                        <span>비밀번호 표시</span>
                    </label>
                </span>
                <p>이름 :
                    <input type="text" text="이름" value={userName} onChange={handlerChangeUserName} />

                </p>
                <p>이메일 :
                    <input type="email" text="이메일" value={userEmail} onChange={handlerChangeUserEmail} />
                    {userEmail.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{userEmailMessage}</span>}
                </p>
                <p>전화번호 :
                    <input type="text" text="전화번호" value={userPhoneNumber} onChange={handlerChangeUserPhoneNumber} />
                </p>
            </div>

            <section>
                <button
                    onClick={handlerOnClick}
                    type="submit">
                    회원가입하기
                </button>
            </section>
        </>
    );
};

export default Regist;