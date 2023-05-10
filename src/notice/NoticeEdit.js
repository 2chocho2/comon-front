import axios from "axios"
import { useEffect, useState } from "react"
import "../css/notice.css";
import jwtDecode from 'jwt-decode';

const NoticeEdit = ({ match, history }) => {
    const { noticeIdx } = match.params;

    const [category, setCategory] = useState([]);
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContent, setNoticeContent] = useState('');
    const [noticeCategoryIdx, setNoticeCategoryIdx] = useState('');

    const handlerChangeNoticeCategory = e => {
        setNoticeCategoryIdx(e.target.value);
        console.log(e.target.value);
        console.log(noticeCategoryIdx);
    }
    const handlerChangeTitle = e => setNoticeTitle(e.target.value);
    const handlerChangeContent = e => setNoticeContent(e.target.value);

    useEffect(() => {
        axios
            .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/detail/${noticeIdx}`)
            .then(res => {
                setNoticeTitle(res.data.noticeTitle);
                setNoticeContent(res.data.noticeContent);
                setNoticeCategoryIdx(res.data.noticeCategoryIdx);
                console.log(res.data);
            })
            .catch(err => console.log(err));
        axios
            .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/category`)
            .then(res => {
                setCategory(res.data);
                setNoticeCategoryIdx(res.data.noticeCategoryIdx);
            })
            .catch(err => console.log(err));
    }, [noticeIdx]);

    const handlerClickList = () => {
        history.push('/notice');
    };

    const handlerClickEdit = (e) => {
        e.preventDefault();

        axios
            .put(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/edit/${noticeIdx}`, {
                noticeCategoryIdx, noticeTitle, noticeContent
            })
            .then(res => {
                if (res.data === 1) {
                    alert('정상적으로 수정되었습니다.');
                    history.push(`/notice/detail/${noticeIdx}`)
                } else {
                    alert('수정에 실패했습니다.');
                    return;
                }
            })
            .catch(err => {
                console.log(err);
                alert(`수정에 실패했습니다. (${err.message})`);
                return;
            });
    }
    return (
        <div className="edit-notice">
            <form action="" method="POST" id="frm" name="frm">
                <input type="hidden" name="noticeIdx" />
                <div className="edit-top">
                    <div className="edit-select-category">
                        <div>
                            카테고리
                            <select id="category" name="category" value={noticeCategoryIdx} onChange={handlerChangeNoticeCategory}>
                                {category &&
                                    category.map((category, index) => (
                                        <option key={index} value={category.noticeCategoryIdx}>
                                            {category.noticeCategoryName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="edit-title">
                        <div>
                            제목<input type="text" id="title" name="title" value={noticeTitle} onChange={handlerChangeTitle} />
                        </div>
                    </div>
                </div>
                <div className="edit-bottom">
                    <div className="edit-content">
                        <div>
                            <textarea title="내용" id="contents" name="contents" value={noticeContent} onChange={handlerChangeContent}></textarea>
                        </div>
                    </div>
                </div>
                <div className="bottom-btn">
                    <input type="button" id="list" className="btn" value="목록으로" onClick={handlerClickList} />
                    <input type="button" id="edit" className="edit-btn" value="수정하기" onClick={handlerClickEdit} />
                </div>
            </form>
        </div>
    )

}
export default NoticeEdit;