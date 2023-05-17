import React, { useEffect, useState } from "react";
import Highcharts, { error } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import './adminChart.css';
import jwtDecode from "jwt-decode";

function PieChart() {

    const [countAllUser, setCountAllUser] = useState();
    const [countAllDev, setCountAllDev] = useState();
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

        axios
            .get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/chart/countalluseranddev`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                const { countAllUser, countAllDev } = response.data;
                setCountAllUser(countAllUser);
                setCountAllDev(countAllDev);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits: {
            enabled: false,
        },
        title: {
            text: null,
            align: 'center'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: '사용자수',
            colorByPoint: true,
            data: [{
                name: `일반사용자 ${countAllUser}명`,
                y: countAllUser || 0,
                sliced: true,
                selected: true,
                color: '#0D4BBE'
            }, {
                name: `개발자 ${countAllDev}명`,
                y: countAllDev || 0,
                color: '#FFBA4A'
            }]
        }]
    }

    return (
        <>
        <div id="pieChart" className="pieChartBox">
            <div className="pieChart-title">
                <p>사용자수 통계</p>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        </>
    )
};
export default PieChart;