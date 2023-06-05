import { useEffect, useState } from "react";
import Navi from "../Navi/Navi";
import MyPageSide from "./MyPageSide";
import axios from "axios";
import { RiUserSettingsFill, RiPhoneFill } from "react-icons/ri";
import { BiMinusCircle } from "react-icons/bi";
import { MdMarkEmailRead } from "react-icons/md";
import jwtDecode from 'jwt-decode';
import Swal from "sweetalert2";
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserInfo = ({ history }) => {
    
    const [data, setData] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState(0);
    const [userId, setUserId] = useState(0);
    const [userPassword, setUserPassword] = useState('');


    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwtDecode(token)
        let userId = decode_token.sub;

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/mypage/edit/${userId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
              
                setUserId(userId);
                setData(res.data);
                setUserName(res.data.userName);
                setUserEmail(res.data.userEmail);
                setUserPassword(res.data.userPassword);
                setUserPhoneNumber(res.data.userPhoneNumber.substr(0, 3) + '-' + res.data.userPhoneNumber.substr(3, 4) + '-' + res.data.userPhoneNumber.substr(7, 4));
               
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const handlerChangePhoneNumber = (e) => {
        const before = e.target.value.replaceAll('-', '');

        // 숫자 여부 체크
        let numberFormat = before.replace(/[^0-9]/g, '');

        // 길이에 따라서 짤라서 포맷팅 
        if (numberFormat.length < 3) {
            numberFormat = numberFormat.substr(0, 3);
        } else if (numberFormat.length > 4 && numberFormat.length < 8) {
            numberFormat = numberFormat.substr(0, 3) + '-' + numberFormat.substr(3, 4);
        } else if (numberFormat.length >= 8) {
            numberFormat = numberFormat.substr(0, 3) + '-' + numberFormat.substr(3, 4) + '-' + numberFormat.substr(7, 4);
        }

        setUserPhoneNumber(numberFormat);
    };

    const handlerChangeName = (e) => { setUserName(e.target.value) };
    const handlerChangeEmail = (e) => { setUserEmail(e.target.value) };

    const handlerClickEdit = () => {
        console.log(userId);
        axios.post(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/mypage/edit`,
            { userId, userName, userEmail, userPhoneNumber: userPhoneNumber.replaceAll('-', '') },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(res => {
                Swal.fire({text:`회원 정보 수정이 완료되었습니다.`});
                history.push('/mypage');
            })
            .catch(err => {
                console.log(err);
            })
    };

   

  // 탈퇴하기 기능
  const handlerClickDelete = () => {
    Swal.fire({
      title: '탈퇴하시겠습니까?',
      text: "주의: 탈퇴하시면 정보가 영구 삭제됩니다. 신중히 선택해주시기 바랍니다. ",
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonText: '승인',
      cancelButtonText: '취소',
      reverseButtons: true, 
    }).then((result) => {
      if (result.isConfirmed) {
        // 비밀번호 확인
        Swal.fire({
          title: '비밀번호를 입력해주세요.',
          input: 'password',
          inputPlaceholder: '비밀번호를 입력해주세요.',
          showCancelButton: true,
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          inputValidator: (value) => {
            if (!value) {
              return '비밀번호를 입력해야 합니다.';
            }
          },
        }).then((result) => {
          if (result.isConfirmed) {
            const userDeletePassword = result.value;
  
            // 사용자 탈퇴 요청
            axios
              .delete(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/userDelete/${userId}`, {
                data: {
                  userDeletePassword: userDeletePassword,
                },
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
              })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  Swal.fire({
                    icon: 'success',
                    title: '정상적으로 삭제되었습니다.',
                    timer: 800
                  }).then(() => {
                    window.location.href = '/'; // 정상적으로 삭제되면 메인페이지로 이동
                    sessionStorage.clear();
                    localStorage.clear();
                    showToastMessage();
                    setIsLoggedIn(false);
                  });
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: '삭제에 실패했습니다.',
                    timer: 800
                  });
                }
              })
              .catch((error) => {
                console.log(error);
                Swal.fire({
                  icon: 'error',
                  title: '삭제에 실패했습니다.',
                  text: error.message,
                });
              });
          }
        });
      }
    });
  };
    

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      if (sessionStorage.getItem('token') != null) {
          setIsLoggedIn(true);
      } else if (window.localStorage.getItem('userName')!= null) {
          setIsLoggedIn(true);
      } else {
          setIsLoggedIn(false);
      }
  }, [])

  const showToastMessage = () => {
    toast('그동안 이용해주셔서 감사합니다.🙏', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

    return (
        <>
            <div id='my-container'>
                <Navi history={history} />
                <MyPageSide />
                <div className='edit-user-info-body'>
                    <div className='edit-user-info-header'>
                        <p className='edit-user-info-title'>회원 정보 변경</p>
                    </div>
                    <div className='edit-user-info-form'>

                        <div className='edit-user-info-name'>
                            <RiUserSettingsFill className="user-info-icon" />
                            <div className="edit-user-info">
                                <p className='edit-user-info-form-title'><span>*</span> 이름</p>
                                <input type='text'
                                    onChange={handlerChangeName}
                                    value={userName}
                                    className='edit-user-info-form-input' />
                            </div>
                        </div>

                        <div className='edit-user-info-phone'>
                            <RiPhoneFill className="user-info-icon" />
                            <div className="edit-user-info">
                                <p className='edit-user-info-form-title'><span>*</span> 휴대전화</p>
                                <input type="text"
                                    onChange={handlerChangePhoneNumber}
                                    maxLength={13}
                                    value={userPhoneNumber}
                                    className='edit-user-info-form-input'></input>
                            </div>
                        </div>

                        <div className='edit-user-info-email'>
                            <MdMarkEmailRead className="user-info-icon" />
                            <div className="edit-user-info">
                                <p className='edit-user-info-form-title'><span>*</span> 이메일</p>
                                <input type='text'
                                    onChange={handlerChangeEmail}
                                    value={userEmail}
                                    className='edit-user-info-form-input' />
                            </div>
                            <button type='button'
                                onClick={handlerClickEdit}
                                className='edit-user-info-submit-button'>회원 정보 변경</button>
                            <button className="userOut-btn" type='button' onClick={handlerClickDelete} ><BiMinusCircle className="userOut-icon"/>탈퇴하기</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
export default EditUserInfo;