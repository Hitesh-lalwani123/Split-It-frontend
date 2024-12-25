import React from "react";
import Header from "./Header";
import Expense from "./Expense";
import People from "./People";
import BadgeTemplate from "../templates/BadgeTemplate";
import { PrimaryButtonTemplate } from "../templates/ButtonTemplate";

const Home = ({ people, handleSetToggle }) => {
  return (
    <BadgeTemplate>
      <div className="">
        <div className="col-span-1 m-2 p-2">
          <PrimaryButtonTemplate>
          <button
            onClick={handleSetToggle}
            className=""
          >
            Add Expense
          </button>
          </PrimaryButtonTemplate>
          <div className="bg-slate-200">
            <Expense people={people} />
          </div>
          <div className="bg-slate-300">
            <People people={people} />
          </div>
        </div>
      </div>
    </BadgeTemplate>
  );
};

export default Home;
