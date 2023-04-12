import {Link} from 'react-router-dom';

const AppRegist = () => {
    return (
        <div>
            <div>
                <ul>
                    <li><Link to='/dev/appregist'>앱 등록</Link></li>
                    <li><Link to='/dev/applist'>앱 관리</Link></li>
                    <li><Link to='/dev/setting'>설정</Link></li>
                </ul>
            </div>
            <div>
                <p>앱 관리</p>
                <hr />
                <p>앱 세부 정보</p>
                <div>
                    <ol>
                        <li>
                            <p>앱 이름</p>
                            <input type="text" placeholder="앱 이름을 입력해 주세요." />
                        </li>
                        <li>
                            <p>간단한 설명</p>
                            <input type="text" placeholder="한 줄 정도로 앱을 설명해 주세요." />
                        </li>
                        <li>
                            <p>자세한 설명</p>
                            <input type="textarea" placeholder="앱의 기능 및 특징에 대해 자세히 설명해 주세요." />
                        </li>
                        <li>
                            <p>앱 아이콘 이미지 등록<span style={{ color: 'gray'}}>(512 px * 512 px)</span></p>
                            <div>
                                <input type='file' id='file' />
                            </div>
                        </li>
                        <li>
                            <p>썸네일 이미지 등록</p>
                            <div>
                                <input type='file' id='file' />
                            </div>
                        </li>
                        <li>
                            <p>스크린샷 이미지</p>
                            <div>
                                <input type='file' id='file' />
                            </div>
                        </li>
                        <li>
                            <p>실행 파일 등록</p>
                            <div>
                                <input type='file' id='file' />
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default AppRegist;