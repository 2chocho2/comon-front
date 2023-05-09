import axios from "axios";
import { useEffect, useState } from "react";
import notice1 from "./notice1.png";
import "../css/notice.css";
import { Link } from "react-router-dom";

const NoticeWrite = ({ history }) => {
  const [category, setCategory] = useState([]);
  const [noticeCategoryIdx, setNoticeCategoryIdx] = useState(1);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");

  const handleChangeCategory = (e) => setNoticeCategoryIdx(e.target.value);
  const handlerChangeTitle = (e) => setNoticeTitle(e.target.value);
  const handlerChangeContent = (e) => setNoticeContent(e.target.value);

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/category`)
      .then((res) => {
        console.log(res);
        setCategory(res.data);
        setNoticeCategoryIdx(1);
      })
      .catch((error) => console.log(error));
  }, []);

  const handlerSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/write`, {
        noticeCategoryIdx, noticeTitle, noticeContent
      })
      .then((res) => {
        if (res.data === '정상처리') {
          alert('게시글이 정상적으로 등록되었습니다.');
          history.push('/notice');
        } else {
          alert('게시글 등록에 실패했습니다.');
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        alert(`게시글 등록에 실패했습니다. (${err.message})`);
        return;
      });
  };

  return (
    <div className="write">
      <div className="notice-main">
        <div className="notice-logo">
          <Link to={'/notice'}><img src={notice1} /></Link>
        </div>
        COM:ON의 소식을 만나보세요
      </div>
      <div className="write-top">
        <div className="select-category">
          <div>
            카테고리
            <select id="category" name="category" onChange={handleChangeCategory}>
              {category &&
                category.map((category, index) => (
                  <option key={index} value={category.noticeCategoryIdx}>
                    {category.noticeCategoryName}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="write-title">
          <div>
            제목
            <input type="text" value={noticeTitle} onChange={handlerChangeTitle} />
          </div>
        </div>
      </div>
      <div>
        <textarea className="write-content" value={noticeContent} onChange={handlerChangeContent}></textarea>
      </div>
      <div className="write-btn">
        <input type="submit" className="save-btn" onClick={handlerSubmit} />
      </div>
    </div>
  )

}
export default NoticeWrite;