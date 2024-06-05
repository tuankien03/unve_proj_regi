import styles from './Home.module.css';
import LineChart from '../../components/lineChart';
import BarChart from '../../components/barChart';


function Home() {
    return (
        <div className={styles.Home}>
            <h1>Thống Kê Đăng Kiểm 5 Tháng Trước</h1>
            <LineChart></LineChart>
            <BarChart></BarChart>
        </div>
    );
}

export default Home;