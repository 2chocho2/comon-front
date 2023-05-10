import NaviDefault from '../Navi/NaviDefault';

const SelectLogin = ({history}) => {
    
    const handlerDev = () => {history.push('/devlogin')};

    const handlerUser = () => {history.push('/userlogin')};

    return (
        <>
         <div id="my-container">
         <NaviDefault history={history}/>
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
                                    {/* <p>Hello! COM:ON! Developer Login</p> */}
                                    <section>
                                        <button className="loginBtn" onClick={handlerDev} type="submit">
                                            개발자로 로그인
                                        </button>
                                    </section>
                                    <section>
                                        <button className="loginBtn" onClick={handlerUser} type="submit">
                                            사용자로 로그인
                                        </button>
                                    </section>
                                    
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectLogin;