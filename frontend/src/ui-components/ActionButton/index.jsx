import styles from "./actionbutton.module.css";

const ActionButton = ({
  label = "",
  Icon = null,
  inverse = false,
  style = {},
  onClick = () => {},
}) => {
  return (
    <button
      className={` flex bg-[#000] text-white box-border p-[5px] md:p-[10px] border-none rounded-md text-sm items-center cursor-pointer 
      ${inverse ? " text-black border-[1px] border-black" : ""}
      `}
      style={style}
      onClick={onClick}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
