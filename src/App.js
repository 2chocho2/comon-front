import logo from './logo.svg';
import './App.css';
import ImageList from './ImageList';
import { Route } from 'react-router-dom';
import ImageDetail from './ImageDetail';
import ImageWrite from './ImageWrite';
import AppRegist from './dev/AppRegist';
import DevSetting from './dev/DevSetting';
import AppListDev from './dev/AppListDev';
import AppListAdmin from './admin/AppListAdmin';
import Judge from './admin/Judge';
import JudgeDetail from './admin/JudgeDetail';
import AdminAppDetail from './admin/AdminAppDetail';
import AdminSetting from './admin/AdminSetting';
import Main from './main/Main';
import AppList from './main/AppList';
import AppDetail from './main/AppDetail';
import MyService from './mypage/MyService';
import EditUserInfo from './mypage/EditUserInfo';
import Login from './login/Login';
import Regist from './login/Regist';

function App() {
  return (
    <>
      {/* <JudgeDetail /> */}
      {/* 관리자용 */}
      
      <Route path="/admin" render={(props) => <AppListAdmin {...props} /> } exact={true} />
      <Route path="/admin/judge" render={(props) => <Judge {...props} /> } exact={true} />
      <Route path="/admin/judge/:imageidx" render={(props) => <JudgeDetail {...props}/> } exact={true} />
      <Route path="/admin/appdetail/:imageidx" render={(props) => <AdminAppDetail {...props}/> } exact={true} />
      <Route path="/admin/setting" render={(props) => <AdminSetting {...props}/> } exact={true} />


      {/* 개발자용 */}
      <Route path='/dev/applist' render={(props) => <AppListDev {...props} /> } exact={true} />
      <Route path='/dev/appregist' render={(props) => <AppRegist {...props} /> } exact={true} />
      <Route path="/dev/setting" render={(props) => <DevSetting {...props}/> } exact={true} />
      

      {/* 사용자용 - 메인 */}
      <Route path='/main' render={(props) => <Main {...props} /> } exact={true} />
      <Route path='/user/applist' render={(props) => <AppList {...props} />} exact={true} />
      <Route path='/user/appdetail/:imageIdx' render={(props) => <AppDetail {...props} /> } exact={true} />
      
      {/* 사용자용 - 마이페이지 */}
      <Route path='/mypage' render={(props) => <MyService {...props} /> } exact={true} />
      <Route path='/mypage/edit' render={(props) => <EditUserInfo {...props} /> } exact={true} />
      
      <Route path='/login' render={(props) => <Login {...props} /> } exact={true} />
      <Route path='/regist' render={(props) => <Regist {...props} /> } exact={true} />
      
      <Route path='/list' component={ImageList} exact={true} />
      {/* 
      <Route path='/image/write' component={ImageWrite} exact={true} />
      <Route path='/image/detail/:id' render={(props) => <ImageDetail {...props}/>} exact={true}/>
       */}
      
    </>
  );
}

export default App;
