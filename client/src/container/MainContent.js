import styles from "./css/MainContent.module.css";
import IconButton from "../components/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Search from "../components/Search";
import User from "../components/User";
import { Routes, Route, Outlet } from "react-router-dom";
import Chart from "../pages/chart/Chart";
import Home from "../pages/home/Home";
import Registration from "../pages/registration/Registration";
import Signup from "../pages/signup/signup";
import { useState, useEffect } from "react";
export default function MainContent() {
  const [username, setUsername] = useState("");
  const url =
    "https://www.falstaff-travel.com/wp-content/uploads/2022/03/shutterstock_1253799112.jpg";
  function getUserName() {
    fetch("http://localhost:5000/account/loggedInUser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setUsername(res.user.userName));
  }
  useEffect(() => {
    getUserName();
  }, []);
  return (
    <>
      <div className={styles.MainContent}>
        <div className={styles.Header}>
          <Search></Search>
          <div>
            <IconButton>
              <FontAwesomeIcon icon={icon({ name: "bell" })} />
            </IconButton>
            <User username={username} src={url}></User>
          </div>
        </div>
        <div className={styles.Body}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
