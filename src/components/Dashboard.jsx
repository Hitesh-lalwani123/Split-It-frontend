import React, { useEffect, useState } from "react";
import Header from "./Header";
import Expense from "./Expense";
import People from "./People";
import BadgeTemplate from "../templates/BadgeTemplate";
import { PrimaryButtonTemplate } from "../templates/ButtonTemplate";

const Dashboard = ({ people, handleSetToggle,person }) => {
  const [curr,setCurr] = useState({});
  useEffect(()=>{
    
  },[])
  return (
    <BadgeTemplate>
      <div className="">
        {/* {person} */}
        <div className="col-span-1 m-2 p-2">
          {curr.name ? curr.name:"Name not found"}
          {curr.spent ? "":""}
        </div>
      </div>
    </BadgeTemplate>
  );
};

export default Dashboard;
