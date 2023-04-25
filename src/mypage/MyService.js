import { useState, useEffect } from "react";
import Navi from "../Navi/Navi";
import MyPageSide from "./MyPageSide";
import axios from "axios";

const MyService = () => {

    const [data, setData] = useState([]);

    //TODO. 현재 하드 코딩 상태
    const userId = 'chocho';
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/myservice/${userId}`)
            .then(res => {
                setData(res.data.map((item) => ({ ...item, hover: false })));
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

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

    return (
        <>
            <Navi />
            <MyPageSide />
            <div className='my-service-body'>
                <p className='my-service-title'>사용 중인 서비스</p>
                <hr className='my-service-body-hr' />
                <div className='my-service-box'>
                    {data
                        &&
                        data.map((data, index) => (
                            <>
                                <div className='my-app-each'
                                    onMouseOver={() => handlerMouseOver(index)}
                                    onMouseOut={() => handlerMouseOut(index)}>
                                    {
                                        data.hover
                                            ?
                                            <>
                                                <div className='my-app-hover'></div>
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

                            </>
                        ))}
                </div>
            </div>
        </>
    );
}
export default MyService;