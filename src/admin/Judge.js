import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Judge = () => {

    const [ data, setData ] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/applist/regist')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div>
        <div>
            <ul>
                <li><Link to='/dev/appregist'>앱 등록</Link></li>
                <li><Link to='/dev/applist'>앱 관리</Link></li>
                <li>설정</li>
                <li><Link to='/admin'>모든 앱</Link></li>
                <li><Link to='/admin/judge'>심사</Link></li>
            </ul>
        </div>
            
    </div>   
    )
}
export default Judge;