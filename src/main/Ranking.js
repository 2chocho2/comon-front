const Ranking = ({ rankingList }) => {

    return (
        <div className='rank'>
            {rankingList
                &&
                rankingList.map(data => (
                    <>
                        <div className='rank-each'>
                            <div className='rank-header'>
                                <div className='rank-header-round-left'></div>
                                <div className='rank-header-round-right'></div>
                            </div>
                            <img src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`} />
                            <div className='rank-image-description'>
                                <p className='rank-imagename'>{data.imageName}</p>
                                <p className='rank-devname'>{data.devName}</p>
                                <p className='rank-description'>{data.imageDescription}</p>
                            </div>

                        </div>

                    </>
                ))}
        </div>
    );
}
export default Ranking;