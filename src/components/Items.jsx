import React from "react";

const Items = ({ list, handleItemDelete }) => {
  return (
    <div>
      {list.map((item, key) => {
        return (
          <div key={key} className="bg-green-300 grid grid-cols-4">
            <span id="description" className="col-span-1 border-x-2">
              {item.desc}:{" "}
            </span>
            <span id="amount" className="col-span-1 border-x-2">
              Rs. {item.amt}
            </span>
            <button
              onClick={() => handleItemDelete(key)}
              className="bg-red-600 ml-2 col-span-1 border-x-2"
            >
              Delete
            </button>
            <div className="bg-yellow-600 ml-2 col-span-1 border-x-2">
              {item.today}

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Items;
