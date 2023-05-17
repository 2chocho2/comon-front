import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import './adminChart.css';
import jwtDecode from "jwt-decode";

function MonthlyCount() {

  const [list, setList] = useState('');
  const [authYn, setAuthYn] = useState(false);

  useEffect(() => {

    if (sessionStorage.getItem('token') == null) {
      setAuthYn(false);
    } else {
      const token = sessionStorage.getItem('token');
      const decode_token = jwtDecode(token);
      let authIdx = decode_token.authIdx;
      if (authIdx === 3) {
        setAuthYn(true);
      } else {
        setAuthYn(false);
      }
    }

    axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/chart/monthlycount`,
    { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
      .then(res => {
        setList(res.data.list);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  let xData = [], yData = [];
  for (const lists of list) {
    xData.push(lists.registDt);
    yData.push(lists.monthlyCount);
  }

  const options = {
    chart: {
      type: 'column'
    },
    credits: {
      enabled: false
    },
    title: {
      text: null
    },

    subtitle: {
      text: '(건)',
      align: 'left'
    },

    xAxis: {
      categories: xData,
      crosshair: true
    },
    yAxis: {
      title: {
        text: null
      }
    },

    tooltip: {
      crosshairs: true,
      shared: true,
      valueSuffix: '건',
      style: {
        'font-family': 'TheJamsil5Bold'
      }
    },

    legend: {
      enabled: false
    },

    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{y} 건'
        }
      }
    },
    series: [
      {
        name: '월별 앱 출시',
        data: yData,
        color: '#FFBA4A'
      }]
  }

  return (
    <div id="monthlyCountChart" className='MonthlyCountBox'>
      <div className="monthlyCountChart-title">
        <p>월별 앱 출시 통계</p>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default MonthlyCount;
