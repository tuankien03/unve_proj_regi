import style from './css/button.module.css';

function Button(props) {
  return (
      <button className={style.button}>{props.text}</button>
  );
}

export default Button;