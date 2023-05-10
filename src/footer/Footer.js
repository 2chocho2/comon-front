import { useState, useEffect } from "react";
import './footer.css'
import axios from "axios";

const Footer = (props) => {

    const [noticeList, setNoticeList] = useState([]);
    
    const handlerClickNotice = () => {
        props.history.push(`/notice`);
    }

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/notice`,
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                console.log(res);
                setNoticeList(res.data.list1);
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
                    <div className="notice" onClick={handlerClickNotice}>
                        공지사항나올곳어쩌고저쩢고 하드코딩어쩌고기저쩢고
                        두개는 나올거니까 엊쩌고 저쩌고
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