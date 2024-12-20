import React from "react";
import Header from "./Header";
import Expense from "./Expense";
import People from "./People";
const Home = ({ people, handleSetToggle,handleReset }) => {
  return (
    <div>
      <div className="col-span-1 m-2 p-2">
        <button onClick={handleSetToggle} className="bg-black text-white">
          Add Expense
        </button>
        <div className="bg-slate-200">
          <Expense people={people} />
        </div>
        <div className="bg-slate-300">
          <People people={people} />
        </div>
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
