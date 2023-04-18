import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NaviAdmin from '../Navi/NaviAdmin';
import '../css/dev.css';

const AdminAppDetail = ({ match, history }) => {

    const { imageidx } = match.params;

    const [data, setData] = useState({});
    const [denyList, setDenyList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reason, setReason] = useState('거절 사유를 선택해 주세요.');
    const [denyIdx, setDenyIdx] = useState(0);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/applist/${imageidx}`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // 카테고리 이름 설정
    const handlerSetCategoryName = () => {
        if (data.categoryIdx == 1) {
            return (
                <input type='text'
                    className='text-inputbox'
                    value='LifeOn'
                    readOnly />
            );
        } else {
            return (
                <input type='text'
                    className='text-inputbox'
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
            img && <img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/screenshot/${img}`} key={index} />
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
    };

    const handlerClickDelete = () => {
        axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/registdelete/${imageidx}`)
            .then(res => {
                console.log(res);
                alert(`삭제 처리가 완료되었습니다.`);
                history.push('/admin');
            })
            .catch(err => {
                console.log(err);
                alert(`삭제 처리 중 오류가 발생했습니다.`);
            })
    };

    return (
        <div>
            <NaviAdmin />
            <div className='sidemenu'>
                <ul className='sidemenu_link'>
                    <li><Link to='/dev/appregist'>앱 등록</Link></li>
                    <li><Link to='/dev/applist'>앱 관리</Link></li>
                    <li><Link to='/admin/setting'>회원 관리</Link></li>
                    <li><Link to='/admin'>모든 앱</Link></li>
                    <li><Link to='/admin/judge'>심사</Link></li>
                </ul>
            </div>
            <div className='body'>
                <p className='body_title'>앱 관리</p>
                <hr />
                <p className='body_subtitle'>앱 세부 정보</p>
                <div className='form'>
                    <ol>
                        <li className='form-each'>
                            <p className='form-title'>카테고리</p>
                            {handlerSetCategoryName()}
                        </li>
                        <li className='form-each'>
                            <p className='form-title'>앱 이름</p>
                            <input type='text'
                                className='text-inputbox'
                                value={data.imageName}
                                readOnly />
                        </li>
                        <li className='form-each'>
                            <p className='form-title'>간단한 앱 설명</p>
                            <input type='text'
                                className='text-inputbox'
                                value={data.imageDescription}
                                readOnly />
                        </li>
                        <li className='form-each'>
                            <p className='form-title'>자세한 설명</p>
                            <textarea type='text'
                                className='text-inputbox'
                                value={data.imageDetail}
                                readOnly />
                        </li>

                        <li className='form-each'>
                            <p className='form-title'>앱 아이콘 이미지 </p>
                            <div>
                                <img src={iconImage} />
                            </div>

                        </li>
                        <li className='form-each'>
                            <p className='form-title'>썸네일 이미지 </p>
                            <div>
                                <img src={thumbnailImage} />
                            </div>
                        </li>
                        <li className='form-each'>
                            <p className='form-title'>스크린샷 이미지</p>
                            <div className='screenshot'>
                                {getScreenshotImage()}
                            </div>

                        </li>
                        <li className='form-each'>
                            <p className='form-title'>실행 파일 다운로드</p>
                            <button type='button'
                                onClick={handlerClickDownload}>다운로드</button>
                        </li>
                    </ol>
                    <button type='button' onClick={handlerClickDelete}>삭제 처리</button>
                </div>
            </div>
        </div>
    )

}
export default AdminAppDetail;