import Navi from "../Navi/Navi";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai'

const AppList = ({ history }) => {

    const [categoryActive, setCategoryActive] = useState(0);
    const [data, setData] = useState([]);
    const [starAverage, setStarAverage] = useState({});

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist`)
            .then(res => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        data.forEach((item) => {
            starAvg(item.imageIdx);
        });
    }, [data]);

    // 카테고리 버튼 출력 및 토글 기능
    const categoryList = ['ALL', 'Life:ON', 'Work:ON'];

    const categoryButton = () => {
        const result = [];

        for (let i = 0; i < categoryList.length; i++) {
            result.push(
                <>
                    <button className={categoryActive == i ? 'categoryActive' : 'categoryUnActive'}
                        onClick={toggleCategoryButton}
                        id={i}>{categoryList[i]}</button>
                </>
            )

        } return result;
    };

    const toggleCategoryButton = (e) => {
        setCategoryActive(e.target.id);
        console.log(categoryActive);

        if (e.target.id == 0) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 1) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/1`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 2) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/2`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    const starAvg = (e) => {
        console.log(starAverage);
        console.log(e);
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/average/${e}`)
            .then(res => {
                setStarAverage((prev) => ({ ...prev, [e]: res.data }));
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <>
            <Navi history={history} />
            <div className='applist-back'>
                <div className='applist-header'>
                    <div className='applist-thumbnail'>COMON의 앱 스토어를 만나 보세요!</div>
                    <div className='categoryButton'>
                        {categoryButton()}
                    </div>
                </div>
                <div className='applist'>
                    {
                        data
                        &&
                        data.map((data =>
                            <>
                                <div className='applist-each'>
                                    <div className='applist-image-box'>
                                        <img className='applist-each-thumbnail' src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`} />
                                    </div>
                                    <div className='applist-description'>
                                        <img className='applist-each-icon' src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${data.iconImage}`} />
                                        <div className='applist-description-text'>
                                            <p className='applist-description-name'>{data.imageName}</p>
                                            <p className='applist-description-detail'>{data.imageDescription}</p>
                                        </div>
                                        <div className='star'>
                                            {starAverage[data.imageIdx] && (
                                                <p className='star-avg'>
                                                    <AiFillStar className='star-logo' />{starAverage[data.imageIdx].toFixed(1)}
                                                </p>
                                                
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>))
                    }
                </div>
            </div>
        </>);
}

export default AppList;