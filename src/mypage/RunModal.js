import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai"

const RunModal = (props) => {

    const ModalBg = styled.div`
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background-color: #00000080;
    `;

    const ModalBox = styled.div`
    width: 25rem;
    background-color: white;
    `;

    return(
        <>
        <ModalBg>
            <ModalBox>
                <div className="run_modal">
                    <div className="run_modalBody">
                        <AiOutlineClose id="run_modalCloseBtn"
                             onClick={() => props.setModalIsOpen(false)} />
                        <div>모달</div>
                        {
                            props.setIsLoading
                            ?
                            <>
                                <p>잠시 기다려 주세요</p>
                            </>
                            :
                            <>
                                <p>준비 끝</p>
                            </>
                        }
                    </div>
                </div>
            </ModalBox>
        </ModalBg >
        </>
    );
}
export default RunModal;