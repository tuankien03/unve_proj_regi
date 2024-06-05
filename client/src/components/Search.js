import styles from './css/Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
function Search (props) {
    return (
        <div className={styles.Search}>
            <FontAwesomeIcon icon={icon({name: 'search'}) }/>
            <input type="text" placeholder='Tìm kiếm'/>
        </div>
    );
}

export default Search;