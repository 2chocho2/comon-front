import axios from "axios";
import { useEffect, useState } from "react";
import '../css/appdetail.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

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

    const { imageIdx } = match.params;

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/detail/${imageIdx}`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const thumbnailImage = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`;

    const iconImage = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${data.iconImage}`;

    const handlerClickDownload = () => {

    };

    const imgArr = [data.screenshotImage1,
                    data.screenshotImage2,
                    data.screenshotImage3,
                    data.screenshotImage4,
                    data.screenshotImage5,
                    data.screenshotImage6].filter(img => img !== null);

    // 스크린샷 개수에 맞춰 이미지 출력
    // const getScreenshotImage = () => {

    //     const img1 = data.screenshotImage1;
    //     const img2 = data.screenshotImage2;
    //     const img3 = data.screenshotImage3;
    //     const img4 = data.screenshotImage4;
    //     const img5 = data.screenshotImage5;
    //     const img6 = data.screenshotImage6;

    //     const imgArr = [img1, img2, img3, img4, img5, img6];

    //     // return imgArr.map((img, index) =>
    //     //     img && <img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/screenshot/${img}`} key={index} />
    //     // );
    // };

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };


    return (
        <>
            <div className='detail-back'>
                <div className='detail-left'>
                    <div className='detail-thumbnail'>
                        <img className='img' src={thumbnailImage} />

                        <div className="detail-container">
                            <div className='detail-imagename'>
                                <p><span className='detail-imagename-title'>{data.imageName}</span>의 새로운 기능</p>
                            </div>
                            <div className='detail-download'>
                                <img className='detail-download-icon' src={iconImage} />
                                <div className='datail-download-name'>
                                    <p className='detail-download-name-imagename'>{data.imageName}</p>
                                    <p className='detail-download-name-imagedescription'>{data.imageDescription}</p>
                                </div>
                                <div className='detail-download-section'>
                                    <p>다운로드 수: {data.downloadCount}</p>
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
                            <div className='detail-image-staravg'>

                            </div>
                            <div className='detail-image-registdt'>

                            </div>
                            <div className='detail-image-devinfo'>

                            </div>
                        </div>

                        <div className='detail-how-to-use'>

                        </div>

                        <div className='detail-image-review'>
                            <div className='detail-image-review-star'>

                            </div>
                            <div className='detail-image-review-slider'>

                            </div>
                        </div>

                        <div className='detail-image-download-app'>

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default AppDetail;