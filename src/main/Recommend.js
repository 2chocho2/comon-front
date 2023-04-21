import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../css/main.css';
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


const Recommend = ({ recommendList }) => {

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
            <div>
                <Slider {...settings}>
                    {
                        recommendList
                        &&
                        recommendList.map(data => (
                            <>
                                <div>
                                    <div className='slider-content'>
                                        <img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/icon/${data.iconImage}`} />
                                        <p className='slider-imageName'>{data.imageName}</p>
                                        <hr />
                                        <p className='slider-detail'>{data.imageDescription}</p>
                                    </div>
                                    <div className='slider-thumbnail'>
                                        <img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/screenshot/${data.screenshotImage1}`} />
                                    </div>
                                </div>
                            </>))
                    }
                </Slider>
            </div>
        </>
    );
}

export default Recommend;