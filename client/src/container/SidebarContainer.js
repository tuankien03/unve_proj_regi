import SideBarItem from "../components/SidebarItem";
import styles from "./css/SidebarContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";

function SidebarContainer() {
  const [isAdmin, setIsAdmin] = useState(false);
  function logoutFunc() {
    fetch("http://localhost:5000/account/logout", {
      credentials: "include",
    });
  }

  function CreateAccount() {
    fetch("http://localhost:5000/account/loggedInUser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.user.isAdmin) {
          setIsAdmin(true);
        }
        console.log(res);
      });
  }
  useEffect(() => {
    CreateAccount();
  });
  return (
    <div className={styles.Sidebar}>
      <div className={styles.Feature}>
        <SideBarItem name="Home" src="/mainpage/Home">
          <FontAwesomeIcon icon={icon({ name: "house" })} />
        </SideBarItem>
        <SideBarItem name="Chart" src="/mainpage/Chart">
          <FontAwesomeIcon icon={icon({ name: "chart-simple" })} />
        </SideBarItem>
        <SideBarItem name="Registration" src="/mainpage/Registration">
          <FontAwesomeIcon icon={icon({ name: "registered" })} />
        </SideBarItem>
        {isAdmin ? (
          <SideBarItem name="Create Account" src="/mainpage/RegistAccount">
            <FontAwesomeIcon icon={icon({ name: "file-invoice" })} />
          </SideBarItem>
        ) : null}
      </div>
      <SideBarItem id={styles.logout} name="Logout" src="/" func={logoutFunc}>
        <FontAwesomeIcon
          icon={icon({ name: "right-from-bracket" })}
          className="iconSidebar"
        />
      </SideBarItem>
    </div>
  );
}
export default SidebarContainer;
