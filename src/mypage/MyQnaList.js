import Navi from "../Navi/Navi";
import MyPageSide from "./MyPageSide";

const MyQnaList = ({ history }) => {
    return (
        <>
        <Navi history={ history }/>
        <MyPageSide />
        </>
    );
}
export default MyQnaList;