import styles from './css/IconButton.module.css'
function IconButton (props) {
    return (
        <div className={styles.IconButton}>
            {props.children}
        </div>
    );
}

export default IconButton;