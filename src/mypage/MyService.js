import { useState, useEffect } from "react";
import Navi from "../Navi/Navi";
import MyPageSide from "./MyPageSide";
import axios from "axios";
import { BsPencilFill } from 'react-icons/bs';
import jwt_decode from "jwt-decode";

const MyService = ({ history }) => {

    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState('');
    const [intervalId, setIntervalId] = useState('');

    useEffect(() => {
        // if(sessionStorage.getItem('token') === null) {
        //     alert(`로그인 후 이용 가능합니다.`);
        //     history.push(`/login`);
        // }

        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setUserId(decode_token.sub);
        let userId = decode_token.sub;

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/myservice/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setData(res.data.map((item) => ({ ...item, hover: false })));
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // 앱 상자에 마우스 hover 됐을 때 hover 변수 변경
    const handlerMouseOver = (index) => {
        setData(prevState => {
            const newData = [...prevState];
            if (newData[index]) {
                newData[index].hover = true;
            }
            return newData;
        })
    };

    const handlerMouseOut = (index) => {
        setData(prevState => {
            const newData = [...prevState];
            if (newData[index]) {
                newData[index].hover = false;
            }
            return newData;
        })
    };

    // 앱 실행 핸들러
    const handlerRunApp = (index) => {
        const id = setInterval(() => {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/runapp/${userId}/${index}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
                .then(res => {
                    console.log(res.data.exitCode)
                    if (res.data.exitCode != 0) {
                        clearInterval(id);
                    } else {
                        alert(`localhost:${res.data.endpointPort}로 접속 가능합니다.`);
                    }
                    
                })
                .catch(err => {
                    console.log(err);
                });
        }, 5000);
        // setIntervalId(id);
    };


    // 삭제 버튼 
    const handlerClickDelete = () => {
        setIsEditing(prevIsEditing => !prevIsEditing);
    };

    // 각각 앱 삭제 버튼
    const handlerClickDeleteEach = (e) => {
        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/mypage/${e}/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                console.log(res.data);
                alert(`삭제가 완료되었습니다.`);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <>
            <Navi history={history} />
            <MyPageSide />
            <div className='my-service-body'>
                <div className='my-service-header'>
                    <p className='my-service-title'>사용 중인 서비스</p>
                    <hr className='my-service-body-hr' />
                    <BsPencilFill className='my-service-delete-button'
                        onClick={handlerClickDelete} />
                </div>

                <div className='my-service-box'>
                    {data
                        &&
                        data.map((data, index) => (
                            <>
                                <div className='my-app-each-contain-delete'
                                    onClick={() => handlerRunApp(data.imageIdx)}>
                                    <div className='my-app-each'
                                        onMouseOver={() => handlerMouseOver(index)}
                                        onMouseOut={() => handlerMouseOut(index)}
                                    >
                                        {
                                            data.hover
                                                ?
                                                <>

                                                    <div className='my-app-hover-header'></div>
                                                    <div className='my-app-hover-description'>
                                                        <p className='my-app-hover-imagename'>{data.imageName}</p>
                                                        <hr className='my-app-hover-hr' />
                                                        <p className='my-app-hover-devname'>{data.devName}</p>
                                                        <p className='my-app-hover-description-description'>{data.imageDescription}</p>
                                                    </div>

                                                </>

                                                :
                                                <>
                                                    <div className='my-app-header'>
                                                        <div className='app-header-round-left'></div>
                                                        <div className='app-header-round-right'></div>
                                                    </div>
                                                    <img className='my-app-image' src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`} />
                                                    <div className='my-app-description'>
                                                        <p className='my-app-imagename'>{data.imageName}</p>
                                                        <p className='my-app-devname'>{data.devName}</p>
                                                        <p className='my-app-description-description'>{data.imageDescription}</p>
                                                    </div>
                                                </>
                                        }

                                    </div>
                                    {
                                        isEditing
                                        &&
                                        <button type='button'
                                            className='my-app-delete-button-each'
                                            onClick={() => handlerClickDeleteEach(data.imageIdx)}>x</button>
                                    }

                                </div>
                            </>
                        ))}
                </div>
            </div>
        </>
    );
};
export default MyService;