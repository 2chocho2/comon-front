import { useState, useEffect } from "react";
import Navi from "../Navi/Navi";
import MyPageSide from "./MyPageSide";
import axios from "axios";
import { BsPencilFill } from 'react-icons/bs';
import { RiUserSmileFill } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';

import jwt_decode from "jwt-decode";
import RunModal from "./RunModal";

const MyService = ({ history }) => {

    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState('');
    const [intervalId, setIntervalId] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [port, setPort] = useState('');

    useEffect(() => {
        console.log(modalIsOpen);
        if(sessionStorage.getItem('token') === null) {
            alert(`로그인 후 이용 가능합니다.`);
            history.push(`/login`);
        }

        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setUserId(decode_token.sub);
        let userId = decode_token.sub;
        console.log(decode_token);

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
    const handlerClick = (index) => {
        console.log('>>>>>>>>>>> 클릭');
        setModalIsOpen(true);
        handlerRunApp(index);
    };

    async function handlerRunApp(index) {
        try {
            setIsLoading(true);
            const result = await axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/runapp/${userId}/${index}`,
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } });
            
            console.log("exitCode", result.data.exitCode);

            if (result.data.exitCode != '0') {
                handlerRunApp(index);
            } else if (result.data.exitCode == '0') {
                setIsLoading(false);
                setPort(result.data.endpointPort)
            }
        } catch (err) {
            console.log(err);
            return;
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // 삭제 버튼 
    const handlerClickDelete = (e) => {
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
            <div id="my-container">
                <Navi history={history} />
                <MyPageSide />
                <div className='my-service-body'>
                    <div className='my-service-header'>사용 중인 서비스</div>
                        <BsPencilFill title="사용중인 앱 설정"
                            className='my-service-delete-button'
                            onClick={handlerClickDelete} />
                    
                    <div className='my-service-box'>
                        {data
                            &&
                            data.map((data, index) => (
                                <>
                                    <div className='my-app-each-contain-delete'
                                        onClick={() => handlerClick(data.imageIdx)}>
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

                                                            <p className='my-app-hover-devname'>
                                                                <RiUserSmileFill className="my-app-hover-devicon" />
                                                                {data.devName}초초
                                                            </p>
                                                            <p className='my-app-hover-description-description'>{data.imageDescription}</p>
                                                        </div>

                                                    </>
                                                    :
                                                    <>
                                                        <div className='my-app-header'>
                                                            {/* <div className='app-header-round-left'></div>
                                                            <div className='app-header-round-right'></div> */}
                                                            <div className='app-header-round'></div>
                                                            <div className='app-header-round'></div>
                                                            <div className='app-header-round'></div>
                                                        </div>
                                                        <img className='my-app-image' src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`} />
                                                        <div className='my-app-description'>
                                                            <p className='my-app-imagename'>{data.imageName}</p>
                                                            <p className='my-app-devname'>
                                                                <RiUserSmileFill className="my-app-devicon" />
                                                                {data.devName}
                                                            </p>
                                                            <p className='my-app-description-description'>{data.imageDescription}</p>
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                        {
                                            isEditing
                                            &&
                                            <TiDelete type='button' title="삭제"
                                                className='my-app-delete-button-each'
                                                onClick={() => handlerClickDeleteEach(data.imageIdx)} />
                                        }

                                        {
                                            modalIsOpen
                                            &&
                                            <RunModal 
                                                        closeModal={closeModal}
                                                        isLoading={isLoading}
                                                        port={port}
                                            />
                                        }

                                    </div>
                                </>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default MyService;