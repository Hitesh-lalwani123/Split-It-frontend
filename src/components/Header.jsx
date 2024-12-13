const Header = () => {
  return (
    <div className="bg-blue-300 m-2 p-2 rounded-md  text-white grid grid-cols-4">
      <div className="col-start-1 col-span-2 font-bold text-2xl">Split It</div>
      <button className="col-start-3 col-span-1">Home</button>

      <button className="col-start-4 col-span-1">AddExpenses</button>
    </div>
  );
};

export default Header;
