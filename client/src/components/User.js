import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './css/User.module.css'
function User(props) {
    
    return (
        <div className={styles.User}>
            <img src={props.src} alt='user'/>
            <h3>{props.username}</h3>
            <FontAwesomeIcon icon={icon({name: 'chevron-down'}) }/>
        </div>
    );
}

export default User;