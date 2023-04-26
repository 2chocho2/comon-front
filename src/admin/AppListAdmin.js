import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';

const AppListAdmin = ({ history }) => {

    const [data, setData] = useState([]);
    const [filterActive, setFilterActive] = useState(1);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist`)
            .then(res => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const filterList = ['', '전체 보기', '서비스 중', '삭제 신청', '서비스 종료'];

    const filterButton = () => {
        const result = [];
        for (let i = 1; i < filterList.length; i++) {
            result.push(
                <>
                    <button className={filterActive == i ? 'filterActive' : 'filterUnActive'}
                        onClick={toggleFilterButton}
                        id={i} >{filterList[i]}</button>
                </>
            )
        } return result;
    };

    const createTable = () => {
        if (!Array.isArray(data)) {
            return null;
        }
        return data.map((d, index) => {
            let statusName = '';
            if (d.statusIdx == '1') {
                statusName = '등록';
            } else if (d.statusIdx == '2') {
                statusName = '심사 중';
            } else if (d.statusIdx == '3') {
                statusName = '심사 거절';
            } else if (d.statusIdx == '4') {
                statusName = '출시';
            } else if (d.statusIdx == '5') {
                statusName = '삭제 요청'
            } else if (d.statusIdx == '6') {
                statusName = '서비스 종료'
            }

            let denyName = '';
            if (d.denyIdx == '1') {
                denyName = '이미지 규격이 맞지 않음';
            } else if (d.denyIdx == '2') {
                denyName = '볼륨 설정이 옳지 않음.';
            } else if (d.denyIdx == '3') {
                denyName = '실행을 위한 이미지가 존재하지 않음.';
            } else if (d.denyIdx == '4') {
                denyName = '실행 파일(docker-compose.yaml) 형식이 맞지 않음.';
            } else if (d.denyIdx == '5') {
                denyName = '실행 포트가 올바르게 설정되지 않음.'
            } else if (d.denyIdx == '0') {
                denyName = '';
            }

            return (
                <tr key={index}
                    onClick={() => handlerClickImage(d.imageIdx)}>
                    <td><img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${d.iconImage}`} /></td>
                    <td>{d.imageName}</td>
                    <td>
                        {statusName} <br />
                        <p className="denyCode">{denyName}</p>
                    </td>
                    <td>{d.devName}</td>
                    <td>
                        {d.statusIdx === 5 ?
                            <p>삭제 요청 접수됨</p>
                            : null}
                    </td>
                </tr>
            )
        })
    };

    const handlerClickImage = (e) => {
        history.push(`/admin/appdetail/${e}`);
    };


    const styles = {
        table: {
            width: '80%',
            border: '1px solid black'
        }
    };

    const toggleFilterButton = (e) => {

        setFilterActive(e.target.id);
        console.log(filterActive);

        if (e.target.id == 1) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 2) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/onservice`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 3) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/registdelete`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (e.target.id == 4) {
            axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/delete`)
                .then(res => {
                    console.log(res.data);
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    // // 전체 앱 리스트 조회
    // const handlerClickAll = () => {
    //     axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist`)
    //         .then(res => {
    //             console.log(res.data);
    //             setData(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // };

    // // 서비스 중인 앱 리스트 조회
    // const handlerClickOnService = () => {
    //     axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/onservice`)
    //         .then(res => {
    //             console.log(res.data);
    //             setData(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // };

    // // 삭제 신청 상태의 앱 리스트 조회
    // const handlerClickRegistDelete = () => {
    //     axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/registdelete`)
    //         .then(res => {
    //             console.log(res.data);
    //             setData(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // };

    // // 삭제된 앱 리스트 조회
    // const handlerClickDeleteService = () => {
    //     axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/deleteapplist`)
    //         .then(res => {
    //             console.log(res.data);
    //             setData(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // };

    return (
        <div>
            <NaviAdmin />
            <div className='sidemenu'>
                <div className='main_logo'></div>
                <ul className='sidemenu_link'>
                    <li><Link to='/dev/appregist'>앱 등록</Link></li>
                    <li><Link to='/dev/applist'>앱 관리</Link></li>
                    <li><Link to='/admin/setting'>회원 관리</Link></li>
                    <li id='setting'><Link to='/admin'>모든 앱</Link></li>
                    <li><Link to='/admin/judge'>심사</Link></li>
                </ul>
            </div>
            <div className='body'>
                <p className='body_title'>모든 앱</p>
                <div className='filterAppButton'>
                    {filterButton()}

                </div>
                <table className='AppTable'>
                    <thead>
                        <tr>
                            <th>아이콘</th>
                            <th>앱 이름</th>
                            <th>상태</th>
                            <th>서비스 제공사</th>
                            <th>삭제 요청</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createTable()}
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default AppListAdmin;