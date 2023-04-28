import { useState, useEffect } from "react";
import Navi from "../Navi/Navi";
import MyPageSide from "./MyPageSide";
import axios from "axios";
import { BsPencilFill } from 'react-icons/bs'

const MyService = ({ history }) => {

    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    //TODO. 현재 하드 코딩 상태
    const userId = 'chochocho';
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/myservice/${userId}`,
        { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
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

    // 삭제 버튼 
    const handlerClickDelete = () => {
        setIsEditing(prevIsEditing => !prevIsEditing);
    };

    // 각각 앱 삭제 버튼
    const handlerClickDeleteEach = (e) => {
        console.log(e);
        console.log(userId);
        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/mypage/${e}/${userId}`,
        { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
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
            <Navi history={ history }/>
            <MyPageSide />
            <div className='my-service-body'>
                <div className='my-service-header'>
                    <p className='my-service-title'>사용 중인 서비스</p>
                    <hr className='my-service-body-hr' />
                    <BsPencilFill className='my-service-delete-button' 
                                    onClick={ handlerClickDelete }/>
                </div>
                
                <div className='my-service-box'>
                    {data
                        &&
                        data.map((data, index) => (
                            <>
                                <div className='my-app-each-contain-delete'>
                                    <div className='my-app-each'
                                        onMouseOver={() => handlerMouseOver(index)}
                                        onMouseOut={() => handlerMouseOut(index)}>
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
                                                onClick={ () => handlerClickDeleteEach(data.imageIdx)}>x</button>
                                    }
                                    
                                </div>
                            </>
                        ))}
                </div>
            </div>
        </>
    );
}
export default MyService;