import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

import { useState } from "react";
import { registeredCarData } from '../sampleData/sampleData';

function BarChart() {

    const [carData, setCarData] = useState({
        labels: registeredCarData.map((data) => data.date),
        datasets: [
          {
            label: "Số lượng xe đăng kiểm",
            data: registeredCarData.map((data) => data.registeredCar),
            backgroundColor: ['#833471'],
            borderColor: "black",
            borderWidth: 1,
    
          }
        ],
      });

    return (
        <div style={{width: 500, marginTop: 50}}>
            <Bar data={carData}></Bar>
        </div>
    )
}

export default BarChart;