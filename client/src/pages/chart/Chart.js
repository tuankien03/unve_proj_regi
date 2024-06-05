import LineChart from "../../components/lineChart";
import PieChart from "../../components/pieChart";
import BarChart from "../../components/barChart";
import styles from "./Chart.module.css";

function Chart() {
    return (
        <div className={styles.Chart}>
            <h1>Thống kê và dự đoán xe sẽ hết hạn trong tháng</h1>
            <PieChart></PieChart>
        </div>
    );
}

export default Chart;