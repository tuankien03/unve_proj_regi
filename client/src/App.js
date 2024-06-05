import styles from "./App.module.css";
import MainPage from "./pages/mainpage/Main";
import Login from "./pages/login/login";
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Chart from "./pages/chart/Chart";
import Signup from "./pages/signup/signup";
import Registration from "./pages/registration/Registration";
function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/mainpage/" element={<MainPage/>}>
          <Route path="home" element={<Home/>}/>
          <Route path="chart"element={<Chart/>}/>
          <Route path="registration" element={<Registration/>}/>
          <Route path="RegistAccount" element={<Signup/>}/>
        </Route>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
