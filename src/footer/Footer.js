import { useState, useEffect } from "react";
import '../css/footer.css'
import axios from "axios";

const Footer = (props) => {

    const [noticeList, setNoticeList] = useState([]);

    const handlerClickNotice = () => {
        props.history.push(`/notice`);
    }

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice/main`)
            .then(res => {
                setNoticeList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <div className="footer">
                <div className="footer1">
                    <h2 className="title1">고객센터</h2>
                    <p className="phone">010-0000-0000</p>
                    <p className="email">comon@comon.co.kr</p>
                    <p className="num">상담전화 : 09:00 ~ 18:00</p>
                    <p className="chat">카카오톡 채널 : 09:00 ~ 18:00</p>
                </div>
                <div className="footer2">
                    <h2 className="title1">공지사항</h2>
                    <div className='footer-notice-container'>
                    {
                        noticeList
                        &&
                        noticeList.map((notice, index) => (
                            <>
                                <div className='notice'
                                    onClick={handlerClickNotice}
                                    key={index}>
                                    <p className='footer-notice-content'>{notice.registDt.substring(0, 10)}</p>
                                    <p className='footer-notice-content'>[{notice.noticeCategoryName}]</p>
                                    <p className='footer-notice-content'>{notice.noticeTitle}</p>
                                </div>
                            </>
                        ))
                    }
                    </div>
                    <p className="grey">서울 종로구 인사동길12, 7층</p>
                    <p className="grey">사이트 운영자:주식회사 컴온 코리아</p>
                    <p className="grey">대표이사:윤주영</p>
                </div>
                <div className="copyright">COPYRIGHT © COMON.CO.LTD.ALL RIGHTS RESERVED.</div>
            </div>
        </>
    );
}

export default Footer;