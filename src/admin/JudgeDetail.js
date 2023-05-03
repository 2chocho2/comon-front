import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Modal from 'react-modal';
import JudgeModal from './JudgeModal';
import styled from 'styled-components';

const JudgeDetail = ({ match, history }) => {

    const { imageidx } = match.params;

    const [data, setData] = useState({});
    const [denyList, setDenyList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reason, setReason] = useState('거절 사유를 선택해 주세요.');
    const [denyIdx, setDenyIdx] = useState(0);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/${imageidx}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // 승인 후 자동 앱 출시
    const handlerOnSubmit = () => {
        console.log( `Bearer ${sessionStorage.getItem('token')}`)

        axios.put(
            `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/access/${imageidx}`,
            '',
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
            )
            .then(res => {
                console.log(res);
                alert('정상적으로 처리되었습니다.');
                history.push(`/admin`);
            })
            .catch(err => {
                console.log(err);
                alert('승인 처리 중 오류가 발생했습니다.')
            })
    };



    // 클릭 시 심사 거절 사유 선택 모달 오픈
    const handlerDeny = () => {
        setModalIsOpen(true);
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/denylist`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                console.log(res);
                setDenyList(res.data);

            })
            .catch(err => {
                console.log(err);
            })
    };



    // 모달 컴포넌트에 props로 전달될 reason 선택 이벤트 핸들러
    const handlerClickReason = (e) => {
        setReason(e.target.outerText);
        setDenyIdx(e.target.value);
    };

    // 모달에서 선택된 값과 함께 심사 거절 처리
    const handlerSubmitDeny = () => {
        axios.put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/deny/${imageidx}/${denyIdx}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                console.log(res);
                alert(`심사 거절 처리가 완료되었습니다.`);
                setModalIsOpen(false);
                history.push(`/admin`);
            })
            .catch(err => {
                console.log(err);
            })
    };

    // 카테고리 이름 설정
    const handlerSetCategoryName = () => {
        if (data.categoryIdx == 1) {
            return (
                <input type='text'
                    className='detailtext-inputbox'
                    value='LifeOn'
                    readOnly />
            );
        } else {
            return (
                <input type='text'
                    className='detailtext-inputbox'
                    value='WorkOn'
                    readOnly />
            );
        }
    };

    // icon 이미지 출력
    const iconImage = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${data.iconImage}`;

    // thumbnail 이미지 출력
    const thumbnailImage = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`;


    // 스크린샷 개수에 맞춰 이미지 출력
    const getScreenshotImage = () => {

        const img1 = data.screenshotImage1;
        const img2 = data.screenshotImage2;
        const img3 = data.screenshotImage3;
        const img4 = data.screenshotImage4;
        const img5 = data.screenshotImage5;
        const img6 = data.screenshotImage6;

        const imgArr = [img1, img2, img3, img4, img5, img6];

        return imgArr.map((img, index) =>
            img && <img className='screenshotImg' src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/screenshot/${img}`} key={index} />
        );
    };

    // 개발자가 등록한 yaml 파일 다운로드
    const handlerClickDownload = (filename) => {
        const url = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/download/${data.yamlFile}`
        const download = document.createElement('a');

        download.href = url;
        download.setAttribute('download', filename);
        download.setAttribute('type', 'application/json');
        download.click();
    }

    return (
        <div>
            <NaviAdmin />
            <div className='sidemenu'>
                <div className='main_logo'></div>
                <ul className='sidemenu_link'>
                    <li><Link to='/dev/appregist'>앱 등록</Link></li>
                    <li><Link to='/dev/applist'>앱 관리</Link></li>
                    <li><Link to='/admin/setting'>회원 관리</Link></li>
                    <li><Link to='/admin'>모든 앱</Link></li>
                    <li id='setting'><Link to='/admin/judge'>심사</Link></li>
                </ul>
            </div>
            <div className='body'>
                <p className='body_title'>심사 앱 관리</p>
                <p className='body_subtitle'>앱 세부 정보</p>
                <div className='detailform'>
                    <ol>
                        <li className='detailform-each'>
                            <p className='detailform-title'>카테고리</p>
                            {handlerSetCategoryName()}
                        </li>
                        <li className='detailform-each'>
                            <p className='detailform-title'>앱 이름</p>
                            <input type='text'
                                className='detailtext-inputbox'
                                value={data.imageName}
                                readOnly />
                        </li>
                        <li className='detailform-each'>
                            <p className='detailform-title'>간단한 앱 설명</p>
                            <input type='text'
                                className='detailtext-inputbox'
                                value={data.imageDescription}
                                readOnly />
                        </li>
                        <li className='detailform-each'>
                            <p className='detailform-title'>자세한 설명</p>
                            <textarea type='text'
                                className='detailtext-inputbox'
                                value={data.imageDetail}
                                readOnly />
                        </li>
                        <div className='img-container'>
                            <div id='img-box'>
                                <li className='imgform-each'>
                                    <p className='imgform-title1'>앱 아이콘 이미지 </p>
                                    <div className='icon-img-box'>
                                        <img className='iconImg' src={iconImage} />
                                    </div>

                                </li>
                                <li className='imgform-each'>
                                    <p className='imgform-title1'>썸네일 이미지 </p>
                                    <div className='icon-img-box'>
                                        <img className='thumbnailImg' src={thumbnailImage} />
                                    </div>
                                </li>
                            </div>
                            <li className='sh-imgform-each'>
                                <p className='imgform-title2'>스크린샷 이미지</p>
                                <div className='sh-img-box'>
                                    <div className='screenshot-detail'>
                                        {getScreenshotImage()}
                                    </div>
                                </div>
                            </li>
                        </div>
                        <li className='detailform-each'>
                            <p className='fileform-title'>실행 파일 다운로드</p>
                            <button className='file-button' type='button'
                                onClick={handlerClickDownload}>다운로드</button>
                        </li>
                    </ol>

                    <div className='button-box'>
                        <button id='noJudge-button' type='button' onClick={handlerDeny}> 심사 거절 </button>
                        {modalIsOpen
                            &&
                            <JudgeModal setModalIsOpen={setModalIsOpen}
                                handlerSubmitDeny={handlerSubmitDeny}
                                denyList={denyList}
                                handlerClickReason={handlerClickReason}
                                reason={reason}
                                setReason={setReason} />}
                        <button id='blackButton' type='button' onClick={handlerOnSubmit}> 승인 </button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default JudgeDetail;