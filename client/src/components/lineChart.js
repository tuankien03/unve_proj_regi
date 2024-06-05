import {Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'

import { useState } from "react";
import { registeredCarData } from '../sampleData/sampleData';

function LineChart() {

    const [carData, setCarData] = useState({
        labels: registeredCarData.map((data) => data.date),
        datasets: [
          {
            label: "Số lượng xe đăng kiểm",
            data: registeredCarData.map((data) => data.registeredCar),
            backgroundColor: ['green',],
            borderColor: "black",
            borderWidth: 1,
    
          },
          {
            label: "Số lượng xe sẽ hết hạn",
            data: registeredCarData.map((data) => data.expiredCar),
            backgroundColor: ['red'],
            borderColor: "black",
            borderWidth: 1,
    
          },
        ],
    });


    
    return (
        <div style={{width: 500, marginTop: 50}}>
            <Line data={carData}></Line>
        </div>
    )
}

export default LineChart;