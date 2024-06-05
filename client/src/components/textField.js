import style from './css/textField.module.css';

function TextField(props) {

    let placeHolder = props.name;

    return (
      <>
        <div className={style.container}>
            <label className={style.label}>{props.name + ":"}</label>
            <input className={style.input} style={{width: props.width}}/>
        </div>
      </>
    );
}

export default TextField;