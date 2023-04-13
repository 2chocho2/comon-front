import axios from 'axios';
import { useRef, useState } from 'react';
import {Link} from 'react-router-dom';

const AppRegist = () => {

    const [ imageFiles, setImageFiles ] = useState([]);
    const [ imageName, setImageName ] = useState('');
    const [ imageDescription, setImageDescription ] = useState('');
    const [ imageDetail, setImageDetail ] = useState('');
    const [ yamlFile, setYamlFile ] = useState([]);
    const [ screenshotImgs, setScreenshotImgs ] = useState('');

    // 제한할 파일의 크기
    const MAX_FILE_SIZE = 1 * 1024 * 1024; //1MB
    // 제한할 파일의 개수
    const MAX_FILE_COUNT = 6;

    const handlerChangeImageName = e => setImageName(e.target.value);
    const handlerChangeImageDescription = e => setImageDescription(e.target.value);
    const handlerChangeImageDetail = e => setImageDetail(e.target.value);

    const inputFiles1 = useRef();
    const inputFiles2 = useRef();
    const inputFiles3 = useRef();
    const inputFiles4 = useRef();

    const invalidFile = msg => {
        alert(msg);
        inputFiles1.current.value = '';
        inputFiles2.current.value = '';
        inputFiles3.current.value = '';
        setImageFiles([]);
      };

    // 아이콘, 썸네일, 스크린샷 이미지 변경 이벤트 핸들러
    const handleChangeFile = e => {
        const name = e.target.name;
        // input type file에서 name에 해당
        const files = e.target.files;
        // input type file에서 선택된 file 정보

        // 이미지 미리보기를 위한 로직
        const imageArr = e.target.files;
        let imageURLs = [];
        let image;
        let imagesLength = imageArr.length > 6 ? 6 : imageArr.length;

        for (let i = 0; i < imagesLength; i++) {
            image = imageArr[i];

            const reader = new FileReader();
            reader.onload = () => {
                console.log(reader.result);
                imageURLs[i] = reader.result;
                setScreenshotImgs([...imageURLs]);
            };
            reader.readAsDataURL(image);
        }

        if (files.length > MAX_FILE_COUNT) {
          invalidFile("이미지는 최대 6개 까지 업로드가 가능합니다.");
          return;
        } 
        for (let i = 0; i < files.length; i++) {
          if (!files[i].type.match("image/.*")) {
            invalidFile("이미지 파일만 업로드 가능합니다.");
            return;
          } else if (files[i].size > MAX_FILE_SIZE) {
            invalidFile("이미지 크기는 1MB를 초과할 수 없습니다.");
            return;
          } 
        }

        // 변경되지 않은 {이름, 파일 정보}를 담고 있는 변수
        const unchangedImageFiles = imageFiles.filter(file => file.name !== name)
        setImageFiles([...unchangedImageFiles, { name, files }]);
    };

    // yaml 파일 변경 이벤트 핸들러
    const handleChangeYamlFile = e => {
        const name = e.target.name;
        const files = e.target.files;

        if (files.length > 1) {
            alert("실행 파일은 1개만 등록할 수 있습니다.");
            inputFiles4.current.value = '';
            setYamlFile([]);
        }
    };

    let datas = {
        imageName,
        imageDescription,
        imageDetail
    };

    const formData = new FormData();
    formData.append(
        'data',
        new Blob([JSON.stringify(datas)], { type: 'application/json' })
    );
    Object.values(imageFiles).forEach(
        file => Object.values(file.files).forEach(
            f => formData.append(file.name, f)));
    Object.values(yamlFile).forEach(file => formData.append('yamlfile', file));

    const handlerOnSubmit = () => {
        axios({
            method: 'POST',
            url: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/upload`,
            headers: { 'Content-Type' : 'multipart/form-data;' },
            data: formData
        })
        .then(res => {
            res.data.split('\n').forEach(data => console.log(data));
            alert(`정상적으로 신청이 완료되었습니다.`);
        })
        .catch(err => {
            console.log(err);
            alert('업로드 중 오류가 발생했습니다.');
        })
    };

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
                            <input type="text" 
                                    value={ imageName }
                                    onChange={ handlerChangeImageName }
                                    placeholder="앱 이름을 입력해 주세요." />
                            <p>COM:ON에 표시되는 앱 이름입니다. 기호를 포함하지 않고 간결하게 작성해야 합니다.</p>
                        </li>
                        <li>
                            <p>간단한 앱 설명</p>
                            <input type="text" 
                                    value={ imageDescription }
                                    onChange={ handlerChangeImageDescription }
                                    placeholder="한 줄 정도로 앱을 설명해 주세요." />
                        </li>
                        <li>
                            <p>자세한 설명</p>
                            <input type="textarea" 
                                    value={ imageDetail }
                                    onChange={ handlerChangeImageDetail }
                                    placeholder="앱의 기능 및 특징에 대해 자세히 설명해 주세요." />
                        </li>
                        <li>
                            <p>앱 아이콘 이미지 등록<span style={{ color: 'gray'}}>(512 px * 512 px)</span></p>
                            <div>
                            <div style={{"backgroundColor": "#efefef", "width":"150px", "height" : "150px"}}>
                                </div>
                                <input type="file" 
                                        name="iconimage" 
                                        ref={inputFiles1} 
                                        onChange={handleChangeFile} 
                                        accept="image/*" />
                            </div>
                            <p>PNG 또는 JPEG, 최대 1MB</p>
                        </li>
                        <li>
                            <p>썸네일 이미지 등록<span style={{ color: 'gray'}}>(1024 px * 500 px)</span></p>
                            <div>
                                <input type="file" 
                                        name="thumbnailimage" 
                                        ref={inputFiles2} 
                                        onChange={handleChangeFile} 
                                        accept="image/*" />
                            </div>
                            <p>PNG 또는 JPEG, 최대 1MB</p>
                        </li>
                        <li>
                            <p>스크린샷 이미지<span style={{ color: 'gray'}}>(1024 px * 500 px)</span></p>
                            <div>
                                 
                            { screenshotImgs.map((image, id) => (
                                <div key={ id }>
                                    <img src={ image } style={{ maxWidth: '100px'}}/>
                                </div>
                            ))}
                                
                            <input type="file" 
                                        name="screenshotimage" 
                                        ref={inputFiles3} 
                                        onChange={handleChangeFile} 
                                        multiple
                                        accept="image/*"/>
                            </div>
                            <p>PNG 또는 JPEG, 스크린 샷당 최대 1MB</p>
                        </li>
                        <li>
                            <p>실행 파일 등록</p>
                            <div>
                            <input type="file" 
                                        name="yamlfile" 
                                        ref={inputFiles4} 
                                        onChange={handleChangeYamlFile} />
                            </div>
                            <ul style={ { fontSize: 12, color: 'gray' }}>
                                <li>
                                    실행되야 하는 컨테이너가 1개더라도 yaml 파일 형식으로 등록되어야 합니다.
                                </li>
                                <li>
                                    데이터 서버의 경우, 영속적인 데이터 저장이 필요하다면 볼륨 설정을 해 주시기 바랍니다.
                                </li>
                                <li>
                                    사용자의 디렉터리 형식은 [c:\comon\&#36;&#123;userId&#125;\앱 이름] 의 형식으로 작성해 주시기 바랍니다.    
                                </li>
                                <li>
                                    등록 전 실행되어야 하는 포트를 확인해 주시기 바랍니다.  
                                </li>
                            </ul>
                        </li>
                    </ol>
                <button type='button' onClick={ handlerOnSubmit }> 등록 </button>
                </div>
            </div>
        </div>
    )
}

export default AppRegist;