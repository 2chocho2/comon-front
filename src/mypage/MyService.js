import { useState, useEffect } from "react";
import Navi from "../Navi/Navi";
import MyPageSide from "./MyPageSide";
import axios from "axios";
import { BsPencilFill } from 'react-icons/bs';
import jwt_decode from "jwt-decode";
import MyServiceEdit from "./MyServiceEdit";
import MyServiceRun from "./MyServiceRun";

const MyService = ({ history }) => {

    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [port, setPort] = useState('');

    useEffect(() => {
        console.log(modalIsOpen);
        if (sessionStorage.getItem('token') === null) {
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

                    {
                        isEditing
                            ?
                            <MyServiceEdit data={data}
                                handlerMouseOver={handlerMouseOver}
                                handlerMouseOut={handlerMouseOut}
                                userId={userId}
                                handlerClickDeleteEach={handlerClickDeleteEach}
                                isEditing={isEditing} />
                            :
                            <MyServiceRun data={data}
                                handlerMouseOver={handlerMouseOver}
                                handlerMouseOut={handlerMouseOut}
                                handlerClick={handlerClick}
                                userId={userId}
                                closeModal={closeModal}
                                handlerRunApp={handlerRunApp}
                                isEditing={isEditing}
                                modalIsOpen={modalIsOpen}
                                port={port}
                                isLoading={isLoading} />
                    }
                </div>
            </div>
        </>
    );
};
export default MyService;