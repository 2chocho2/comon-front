import logo from './logo.svg';
import './App.css';
import ImageList from './ImageList';
import { Route } from 'react-router-dom';
import ImageDetail from './ImageDetail';
import ImageWrite from './ImageWrite';
import AppRegist from './dev/AppRegist';
import Setting from './dev/Setting';
import AppListDev from './dev/AppListDev';
import AppListAdmin from './admin/AppListAdmin';
import Judge from './admin/Judge';

function App() {
  return (
    <>
      {/* 관리자용 */}
      <Route path="/admin" component={AppListAdmin} exact={true} />
      <Route path="/admin/judge" component={Judge} exact={true} />

      {/* 개발자용 */}
      <Route path='/dev/applist' component={AppListDev} exact={true} />
      <Route path='/dev/appregist' component={AppRegist} exact={true} />
      <Route path='/dev/setting' component={Setting} exact={true} />

      {/* 사용자용 */}

      <Route path='/list' component={ImageList} exact={true} />
      <Route path='/image/write' component={ImageWrite} exact={true} />
      <Route path='/image/detail/:id' render={(props) => <ImageDetail {...props}/>} exact={true}/>
      
      
    </>
  );
}

export default App;
