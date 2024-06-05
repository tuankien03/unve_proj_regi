import SidebarContainer from "../../container/SidebarContainer";
import MainContent from "../../container/MainContent";
import styles from './MainPage.module.css'
function MainPage() {

    return (
        <div className={styles.MainPage} >
            <SidebarContainer></SidebarContainer>
            <MainContent></MainContent>
        </div>
    );
}

export default MainPage;