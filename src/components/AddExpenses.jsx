import React from "react";
import { PrimaryButtonTemplate } from "../templates/ButtonTemplate";
import BadgeTemplate from "../templates/BadgeTemplate";
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
  item,
  setItem,
  loading,
}) => {
  return (
    <div className="m-5">
      <BadgeTemplate>
        {/* Expenditure */}
        <PrimaryButtonTemplate>
          <button onClick={handleSetToggle} className="">
            Home
          </button>
        </PrimaryButtonTemplate>
        <div className="m-2 p-2">
          <div className="p-5 bg-red-300">
            <div className="font-semibold">
              Enter desc:{" "}
              <input
                className="inline-block"
                type="text"
                required
                placeholder="Enter desc here"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </div>
            <div className="font-semibold">
              Enter amount:{" "}
              <input
                type="number"
                name="amount"
                id="amt"
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
                placeholder="Enter amount"
                className="px-2 bg-slate-900 text-white inline-block"
              />
            </div>
            <PrimaryButtonTemplate>
              <button
                className={`${loading ? "cursor-wait bg-transparent" : ""}`}
                onClick={(e) => handleAddExpense(e)}
                disabled={loading}
              >
                Add expense
              </button>
            </PrimaryButtonTemplate>
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
          Select Involved:
          {people.map((person, key) => {
            return (
              <div key={key}>
                <div
                  className={`inline-block w-1/3 cursor-pointer p-1 rounded-sm ${
                    involved.includes(person.name)
                      ? "bg-violet-400 shadow-md"
                      : "shadow-sm shadow-black"
                  }`}
                  onClick={() => {
                    handleCheckboxChange(person.name);
                  }}
                >
                  {person.name}
                </div>
              </div>
            );
          })}
        </div>
      </BadgeTemplate>
    </div>
  );
};

export default AddExpenses;
