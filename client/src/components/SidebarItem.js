import styles from './css/SidebarItem.module.css';
import {Link, NavLink} from 'react-router-dom';
function SidebarItem(props) {
    return (
        <div className={styles.SidebarItem} id={props.id} onClick={props.func}>
            <NavLink to={props.src} className={styles.Link}><span>{props.children}</span>
<p>{props.name}</p></NavLink>
        </div>
    );
}

export default SidebarItem;