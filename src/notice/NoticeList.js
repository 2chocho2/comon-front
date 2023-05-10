import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import NoticeCategory from "./NoticeCategory";
import "../css/notice.css";
import notice1 from "./notice1.png";
import Navi from '../Navi/Navi';
import jwtDecode from 'jwt-decode';

const NoticeList = ({ history }) => {
    const [noticeList, setNoticeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [authYn, setAuthYn] = useState(false);

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decode_token = jwtDecode(token);
        let authIdx = decode_token.authIdx;
        console.log(authIdx);
        if (authIdx === 3) {
            setAuthYn(true);
        } else {
            setAuthYn(false);
        }

        axios
            .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice?currentPage=${currentPage}`)
            .then((response) => {
                console.log(response.data.list);
                setNoticeList(response.data.list);
                setTotalPages(response.data.pageCount);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentPage]);

    useEffect(() => {
        if (sessionStorage.getItem('token') === null) {
            alert(`로그인 후 이용 가능합니다.`);
            history.push(`/login`);
        }

        axios
            .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/category`,
                { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handlePageClick = (e) => {
        const page = Number(e.target.getAttribute("data-page"));
        setCurrentPage(page);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownVisible(false);
        axios
            .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/category/${category.noticeCategoryIdx}`)
            .then((res) => {
                setNoticeList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const toggleDropdownVisibility = () => {
        setIsDropdownVisible((prevState) => !prevState);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <div
                    className={currentPage === i ? "active" : ""}
                    key={i}
                    data-page={i}
                    onClick={handlePageClick}
                >
                    {i}
                </div>
            );
        }
        return pageNumbers;
    };

    return (
        <div>
            <Navi history={history} />
            <div className="notice-container">
                <div className="notice-main">
                    <div className="notice-logo">
                        <Link to={"/notice"}>
                            <img src={notice1} alt="notice logo" />
                        </Link>
                    </div>
                    COM:ON의 소식을 만나보세요
                </div>
                <div className="notice-category">
                    <div id="app" className="category">
                        <button className="btn" onClick={toggleDropdownVisibility}>
                            {selectedCategory ? selectedCategory.noticeCategoryName : "전체"}
                        </button>
                        <NoticeCategory
                            visibility={isDropdownVisible}
                            setVisibility={setIsDropdownVisible}>
                            {categoryList.map((category) => (
                                <ul className="category-list" key={category.noticeCategoryIdx}>
                                    <li className="category-name" value={category.noticeCategoryIdx} onClick={() => handleCategorySelect(category)}>
                                        {category.noticeCategoryName}
                                    </li>
                                </ul>
                            ))}
                        </NoticeCategory>
                    </div>
                </div>
                <table width="80%" className="notice-list">
                    <colgroup>
                        <col width="15%" />
                        <col width="*" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">카테고리</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticeList &&
                            noticeList.map((notice) => (
                                <tr key={notice.noticeIdx}>
                                    <td>{notice.noticeCategoryName}</td>
                                    <td>
                                        <p>
                                            <Link to={`/notice/detail/${notice.noticeIdx}`}>
                                                {notice.noticeTitle}
                                            </Link>
                                        </p>
                                    </td>
                                    <td>{moment(notice.registDt).format("YYYY-MM-DD")}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div>
                    {
                        authYn
                        &&
                        <Link to={"/notice/write"} className="list-btn">
                            글쓰기
                        </Link>
                    }

                </div>
                <div className="paging">{renderPageNumbers()}</div>
            </div>
        </div>
    );
};

export default NoticeList;
