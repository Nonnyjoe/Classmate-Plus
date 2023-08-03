import styles from "./inlinebutton.module.css";

const InlineButton = ({ type = "", label = "", onClick = () => {} }) => {
  return (
    <button type={type} onClick={onClick} className={styles["btn-style"]}>
      {label}
    </button>
  );
};

export default InlineButton;
