import React from "react";
import axios from 'axios'
const AddExpenses = ({
  people,
  desc,
  setDesc,
  amt,
  setAmt,
  handleAddExpense,
  equal,
  setEqual,
  payer,
  setPayer,
  handleCheckboxChange,
  involved,
  handleSetToggle,
}) => {
  return (
    <div className="m-5 grid grid-cols-2 border-2 border-black rounded-md">
      {/* Expenditure */}
      <div>
        <button
          onClick={handleSetToggle}
          className="bg-black text-white rounded-md"
        >
          Home
        </button>
      </div>
      <div className="col-span-2 m-2 p-2">
        <div className="p-5 bg-red-300">
          Enter desc:{" "}
          <input
            type="text"
            required
            placeholder="Enter desc here"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          Enter amount:{" "}
          <input
            type="number"
            name="amount"
            id="amt"
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
            placeholder="Enter amount"
            className="px-2 bg-slate-900 text-white"
          />
          <button
            className="p-2 bg-black text-white rounded-md m-2"
            onClick={(e) => handleAddExpense(e)}
          >
            Add expense
          </button>
          
        </div>
        Equal:
        <input
          type="radio"
          name="type"
          onChange={(e) => setEqual(e.target.value)}
        />
        Unequal:
        <input type="radio" name="type" />
        <div className="bg-violet-300">
          Paid by: None: <input type="radio" defaultChecked name="payer" />
          {people.map((item, ind) => {
            return (
              <div key={ind}>
                <span id="currname">{item.name}</span>
                <input
                  type="radio"
                  name="payer"
                  onChange={() => {
                    setPayer(item.name);
                  }}
                />
              </div>
            );
          })}
        </div>
        {people.map((person, key) => {
          return (
            <div key={key}>
              {person.name}:{" "}
              <input
                type="checkbox"
                checked={involved.includes(person.name)}
                onChange={() => handleCheckboxChange(person.name)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddExpenses;
