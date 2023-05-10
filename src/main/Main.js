import axios from 'axios';
import { useState, useEffect } from 'react';
import Ranking from './Ranking';
import Recommend from './Recommend';
import NaviMain from '../Navi/NaviMain';
import '../css/appList.css';
import { FaStar } from "react-icons/fa";
import Footer from '../footer/Footer';
import MainSide from './MainSide';

const Main = ({ history }) => {

    const [recommendList, setRecommendList] = useState([]);
    const [rankingList, setRankingList] = useState([]);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/main`)
            .then(res => {
                console.log(res);
                setRecommendList(res.data.list1);
                setRankingList(res.data.list2);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <NaviMain history={history} />
            <div className='main-background'>
                <div className='main-1'>
                    <div className='main-back'>
                        <Recommend recommendList={recommendList} />
                    </div>
                </div>
                <div className='main-2'>
                    <p className='today-rank'>
                        <FaStar className='thumbs-icon' />Today Rank<FaStar className='thumbs-icon' />
                    </p>
                    <div className='rank-box'><Ranking rankingList={rankingList} history={history} />
                    </div>
                </div>
                <MainSide />
                <Footer />

            </div>
        </>
    );
}

export default Main;