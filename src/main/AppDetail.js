import axios from "axios";
import { useEffect, useState } from "react";
import '../css/appdetail.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import jwtDecode from 'jwt-decode';
import ReviewChart from "../chartsample/ReviewChart";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FaAngleRight
            className={className}
            style={{ ...style, display: "block", color: 'black', width: '80px', height: '50px' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FaAngleLeft
            className={className}
            style={{ ...style, display: "block", color: 'black', width: '80px', height: '50px' }}
            onClick={onClick}
        />
    );
}

const AppDetail = ({ match, history }) => {

    const [data, setData] = useState([]);
    const [star, setStar] = useState(5);
    const [reviewList, setReviewList] = useState([]);

    const { imageIdx } = match.params;

    useEffect(() => {
        if (sessionStorage.getItem('token') === null) {
            alert(`로그인 후 이용 가능합니다.`);
            history.push(`/login`);
        }

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/detail/${imageIdx}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                setData(res.data.imageDto);
                setStar(res.data.reviewAvg);
                setReviewList(res.data.reviewList);
                console.log(res.data.reviewList);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const thumbnailImage = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`;

    const iconImage = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${data.iconImage}`;


    // 다운로드 로직
    const handlerClickDownload = () => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwtDecode(token)
        let userId = decode_token.sub;

        axios({
            method: 'POST',
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/downloadapp`,
            data: {
                userId: userId,
                imageIdx: imageIdx
            },
            headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
        })
            .then(res => {
                console.log(res.data);
                if (res.data === '1') {
                    alert(`이미 다운받은 앱입니다`);
                    window.location.reload();
                } else {
                    alert(`앱 다운로드가 완료되었습니다.`);
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    const imgArr = [data.screenshotImage1,
    data.screenshotImage2,
    data.screenshotImage3,
    data.screenshotImage4,
    data.screenshotImage5,
    data.screenshotImage6].filter(img => img !== null);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 2,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />
    };

    const settings2 = {
        dots: true,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        speed: 2,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };


    // 별점 출력
    const starRating = (rating, color = "#000000", size) => {
        return (
            <>
                {Array(parseInt(rating))
                    .fill(2)
                    .map((el, i) => (
                        <BsStarFill key={i} color={color} />
                    ))}
                {rating % 1 !== 0 && <BsStarHalf color={color} />}
                {Array(Math.floor(5 - rating))
                    .fill(2)
                    .map((el, i) => (
                        <BsStar key={i} color={color} />
                    ))}
            </>
        );
    };

    // 출시 일자 출력
    const registDt = () => {
        let appRegistDt = '';
        if (data.registDt != null) {
            appRegistDt = data.registDt.substring(0, 10);
        }
        return <p>{appRegistDt}</p>;
    }

    return (
        <>
            <div className='detail-back'>
                <div className='detail-left'>
                    <div className='detail-thumbnail'>
                        <img className='img' src={thumbnailImage} />

                        <div className="detail-container">
                            <div className='detail-imagename'>
                                <p className='detail-imagename-title'>{data.imageName}  <span style={{ fontSize: '30px' }}>의</span></p>
                                <p className="tiltle2">새로운 기능</p>
                            </div>
                            <div className='detail-download'>
                                <div id="detail-icon-box"><img className='detail-download-icon' src={iconImage} /></div>
                                <div className='datail-download-name'>
                                    <p className='detail-download-name-imagename'>{data.imageName}</p>
                                    <p className='detail-download-name-imagedescription'>{data.imageDescription}</p>
                                </div>
                                <div className='detail-download-section'>
                                    <p className="download-count">다운로드 수: {data.downloadCount}</p>
                                    <button onClick={handlerClickDownload}
                                        className='download-button'>받기</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='detail-right'>
                    <div className="detail-right-content">
                        <div className='detail-screenshot'>
                            <p className="screenshot-title">스크린샷</p>
                            <div className="appdetail-slider-box">
                                <Slider className='appdetail-slider' {...settings}>

                                    {
                                        imgArr
                                        &&
                                        imgArr.map((img, index) =>
                                            <div className='appdetail-slider-each'>
                                                <img className='appdetail-slider-screenshot' src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/screenshot/${img}`} key={index} />
                                            </div>)
                                    }
                                </Slider>
                            </div>
                        </div>
                        <div className='detail-image-description'>
                            <div className='detail-image-description-inner'>
                                <div className='detail-image-staravg'>
                                    <p className="detail-title">평가</p>
                                    <div className="star-score">{star.toFixed(1)}</div>
                                    <div className="stars">{starRating(star)}</div>
                                </div>
                                <div className='detail-image-registdt'>
                                    <p className="detail-title">업로드 날짜</p>
                                    <div className="registdt">{registDt()}</div>
                                    <div className="regist-name"></div>
                                </div>
                                <div className='detail-image-devinfo'>
                                    <p className="detail-title">개발자</p>
                                    <div className="dev-icon"></div>
                                    <div className="dev-name">COM:ON</div>
                                </div>
                            </div>
                        </div>

                        <div className='detail-how-to-use'>
                            <p className="how-to-use-title">서비스 이용</p>
                            <div className="how-to-use-detail">
                                {data.imageDetail}
                            </div>
                        </div>

                        <div className='detail-image-review'>
                            <p className="review-title">리뷰</p>
                            <div className='review-box'>
                                <div className='review-box-inner'>
                                    <div className='review-star-avg'>
                                        <div id="star-box">
                                            <p className='review-star-avg-score'>{star.toFixed(1)}</p>
                                            <p className='review-star-avg-score-fix'>(최고 5점)</p>
                                        </div>
                                    </div>
                                    <div className='review-star'>
                                        <div className="review-star-icon">
                                            {starRating(star)}
                                        </div>
                                    </div>
                                    <div className='review-score-total'>
                                        <ReviewChart imageIdx={imageIdx} />
                                    </div>
                                </div>
                            </div>
                            <div className='detail-image-review-slider'>
                                <Slider className='review-slider-box' {...settings2}>
                                {
                                        reviewList.length > 0
                                            ?
                                            reviewList.map((review) =>
                                                <div className='review-slider-each'>
                                                    <div id="review-slider-each-header">
                                                        <div className='review-slider-each-title'>{review.reviewTitle}</div>
                                                        <div className='review-slider-each-star'>
                                                            <div className="review-slider-each-star-icon">{starRating(review.scoreCount)}</div>
                                                        </div>
                                                    </div>
                                                    <div className='review-slider-each-content'>{review.reviewContent}</div>

                                                </div>)
                                            :
                                            <>
                                                <div className='review-slider-default'>
                                                    <p> 아직 작성된 후기가 없습니다</p>
                                                </div>
                                            </>

                                    }
                                </Slider>
                            </div>
                        </div>
                        <hr />

                        <div className='detail-image-download-app'>
                            <img className='detail-image-download-app-icon' src={iconImage} />
                            <div>
                                <p className='detail-image-download-app-name'>{data.imageName}</p>
                                <p className='detail-image-download-app-description'>{data.imageDescription}</p>
                            </div>
                            <button onClick={handlerClickDownload}
                                className='detail-image-download-button'>받기</button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}
export default AppDetail;