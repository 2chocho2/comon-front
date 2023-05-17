import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import notice1 from "./notice1.png";
import "../css/notice.css";
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import Navi from "../Navi/Navi";
import Swal from "sweetalert2";


const NoticeDetail = ({ match, history }) => {
    const { noticeIdx } = match.params;
    const [notice, setNotice] = useState({});
    const [authYn, setAuthYn] = useState(false);

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decode_token = jwtDecode(token);
        let authIdx = decode_token.authIdx;

        if (authIdx === 3) {
            setAuthYn(true);
        } else {
            setAuthYn(false);
        }

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/detail/${noticeIdx}`)
            .then(res => {
                setNotice(res.data);
            })
            .catch(error => console.log(error));
    }, [noticeIdx]);

    const handlerClickList = () => {
        history.push('/notice');
    };

    const handlerClickUpdate = () => {
        history.push(`/notice/edit/${noticeIdx}`)
    };

    const handlerClickDelete = () => {

        new Swal({
            title: "정말 삭제하시겠습니까?",
            text: "한 번 삭제하면 복구가 불가능합니다.",
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            dangerMode: true,
            reverseButtons: true
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/detail/${noticeIdx}`)
                        .then(res => {
                            if (res.data === 1) {
                                Swal.fire("정상적으로 삭제되었습니다.")
                                history.push('/notice');
                            } else {
                                Swal.fire("삭제에 실패했습니다.")
                                return;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            Swal.fire("삭제에 실패했습니다.")
                        })
                    }
            } );
    }

    const formattedContent = notice.noticeContent ? notice.noticeContent.replace(/\n/g, '<br>') : '';


    return (
        <div className="all">
            <Navi history={history} />
            <div className="notice-container">
                <div className="notice-main">
                    <div className="notice-logo">
                        <Link to={"/notice"}>
                            <img className="notice-img" src={notice1} alt="notice logo" />
                        </Link>
                    </div>
                    COM:ON의 소식을 만나보세요
                </div>
                <div className="detail">
                    <div className="detail-top">
                        <ul className="detail-list">
                            <li className="detail-category-name">[{notice.noticeCategoryName}]
                            </li>
                            <li className="detail-title">{notice.noticeTitle}
                            </li>
                            <li className="detail-dt">{moment(notice.registDt).format('YYYY-MM-DD')}</li>
                        </ul>
                    </div>
                    <div className="detail-content" dangerouslySetInnerHTML={{ __html: formattedContent }} />
                </div>
                <div className="detail-input">
                    <>
                        {
                            authYn
                            &&
                            <div>
                                <input type="button" id="edit" className="detail-btn" value="수정" onClick={handlerClickUpdate} />
                                <input type="button" id="delete" className="detail-btn" value="삭제" onClick={handlerClickDelete} />
                            </div>
                        }
                    </>


                </div>
            </div>
        </div>
    )
}

export default NoticeDetail;