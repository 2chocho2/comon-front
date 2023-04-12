import logo from './logo.svg';
import './App.css';
import ImageList from './ImageList';
import { Route } from 'react-router-dom';
import ImageDetail from './ImageDetail';
import ImageWrite from './ImageWrite';
import AppList from './admin/AppList';
import AppRegist from './admin/AppRegist';

function App() {
  return (
    <>
      
      <Route path='/list' component={ImageList} exact={true} />
      <Route path='/image/write' component={ImageWrite} exact={true} />
      <Route path='/image/detail/:id' render={(props) => <ImageDetail {...props}/>} exact={true}/>
      <Route path='/admin/applist' component={AppList} exact={true} />
      <Route path='/admin/appregist' component={AppRegist} exact={true} />
    </>
  );
}

export default App;
