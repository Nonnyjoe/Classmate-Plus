const HeaderSection = ({ heading, subHeading, rightItem = () => {} }) => {
  return (
    <header
      style={{
        margin: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1 className=" text-[24px] md:text-[30px] font-semibold">{heading}</h1>
        <p>{subHeading}</p>
      </div>
      {rightItem()}
    </header>
  );
};

export default HeaderSection;
