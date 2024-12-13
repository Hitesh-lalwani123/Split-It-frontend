const Expense = ({people}) => {
  return (
    <>
      Total Expenditure:
      {people.map((item, ind) => {
        return (
          <div key={ind}>
            <span style={{ padding: "10px" }} id="name">
              {item.name}
            </span>
            :<span id="myamt">{item.spent}</span>
          </div>
        );
      })}
    </>
  );
};

export default Expense;
