import React from "react";
import ItemTemplate from "../templates/ItemTemplate";
import { PrimaryButtonTemplate,SecondaryButtonTemplate } from "../templates/ButtonTemplate";

const Items = ({ list, handleItemDelete, loading }) => {
  return (
    <div>
      {list.map((item, key) => {
        return (
          <ItemTemplate key={key}>
            <div className="grid grid-cols-4">
              <span id="description" className="col-span-1 m-auto">
                {item.desc}:{" "}
              </span>
              <span id="amount" className="col-span-1 m-auto">
                Rs. {item.amt}
              </span>
              <SecondaryButtonTemplate>
              <button
                onClick={() => handleItemDelete(item)}
                className={`m-auto col-span-1 ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                Delete
              </button>
              </SecondaryButtonTemplate>
              <div className="col-span-1 m-auto">
                {item.today}
              </div>
            </div>
          </ItemTemplate>
        );
      })}
    </div>
  );
};

export default Items;
