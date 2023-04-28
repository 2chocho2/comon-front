import axios from 'axios';
import { useState, useEffect } from 'react';
import Ranking from './Ranking';
import Recommend from './Recommend';
import NaviMain from '../Navi/NaviMain';
import '../css/appList.css';


const Main = ({ history }) => {

    const [recommendList, setRecommendList] = useState([]);
    const [rankingList, setRankingList] = useState([]);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/main`,
        { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
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
            <NaviMain history={ history }/>
            <div className='main-background'>
                <div className='main-1'>
                    <div className='main-back'>
                        <Recommend recommendList={recommendList} />
                    </div>
                </div>
                <div className='main-2'>
                    <p className='today-rank'>Today Rank</p>
                    <hr />
                    <div className='rank-box'><Ranking rankingList={rankingList} />
                    </div>
                </div>

            </div>
        </>
    );
}

export default Main;