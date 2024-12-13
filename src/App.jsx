import { useRef, useState } from "react";
import "./App.css";
import People from "./components/People";
import Expense from "./components/Expense";
import Items from "./components/Items";
import Header from "./components/Header";
import Home from "./components/Home";
import { Routes, Route } from "react-router";
import AddExpenses from "./components/AddExpenses";

//
function App() {
  const [list, setList] = useState([]);
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState(0);
  const [payer, setPayer] = useState(null);
  const [equal, setEqual] = useState(true);
  const [involved, setInvolved] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [people, setPeople] = useState([
    {
      id: 0,
      name: "Hitesh",
      amount: 0,
      spent: 0,
      toHitesh: 0,
      toKirti: 0,
      toVarun: 0,
    },
    {
      id: 1,
      name: "Kirti",
      amount: 0,
      spent: 0,
      toHitesh: 0,
      toKirti: 0,
      toVarun: 0,
    },
    {
      id: 2,
      name: "Varun",
      amount: 0,
      spent: 0,
      toHitesh: 0,
      toKirti: 0,
      toVarun: 0,
    },
  ]);

  // functions
  function handleDebtSimplification() {
    // write logic here to simplify debts
  }
  const handleCheckboxChange = (id) => {
    setInvolved((prev) => {
      if (prev.includes(id)) {
        // If person is already involved, remove them
        return prev.filter((p) => p !== id);
      } else {
        // Otherwise, add them to the list
        return [...prev, id];
      }
    });
  };

  function handleUpdateExpense(e) {}
  function handleAddExpense(e) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    if (involved.length === 0) {
      alert("select involved");
      return;
    }
    if (desc == null || desc == "") {
      alert("enter description");
      return;
    }
    if (payer === null) {
      alert("select payer");
      return;
    }

    e.preventDefault();
    setList([...list, { desc, amt, payer, involved, today }]);
    const updatedPeople = people.map((person) => {
      if (person.name === payer) {
        return {
          ...person,
          amount: person.amount + (amt / involved.length - amt),
          spent: person.spent + 1 * amt,
        };
      } else {
        const payerKey = `to${payer}`;
        if (involved.includes(person.id)) {
          return {
            ...person,
            amount:
              person.amount + Math.round((amt / involved.length) * 100) / 100,
            [payerKey]:
              person[payerKey] +
              Math.round((amt / involved.length) * 100) / 100,
          };
        } else return { ...person };
      }
    });
    setPeople(updatedPeople);
    handleDebtSimplification();
    setAmt(0);
    setDesc("");
    setInvolved([]);
  }
  function handleItemDelete(id) {
    const updatedPeople = people.map((person) => {
      if (person.name === payer) {
        return {
          ...person,
          amount: person.amount - (list[id].amt / involved.length - amt),
          spent: person.spent - 1 * list[id].amt,
        };
      } else {
        // if(person.id in involved){}
        const payerKey = `to${list[id].payer}`;
        if (list[id].involved.includes(person.id)) {
          return {
            ...person,
            amount:
              person.amount -
              Math.round((list[id].amt / list[id].involved.length) * 100) / 100,
            [payerKey]:
              person[payerKey] -
              Math.round((list[id].amt / list[id].involved.length) * 100) / 100,
          };
        } else return { ...person };
      }
    });
    setPeople(updatedPeople);
    const newItems = list.filter((item, ind) => {
      return id !== ind;
    });

    setList(newItems);
  }

  function handleSetToggle() {
    setToggle((val) => {
      if (val) return false;
      else return true;
    });
  }
  return (
    <div className="m-5 border-2 border-black rounded-md">
      {/* Expenditure */}
      <div>
        <Header />
      </div>
      {!toggle ? (
        <div>
          <AddExpenses
            people={people}
            desc={desc}
            setDesc={setDesc}
            amt={amt}
            setAmt={setAmt}
            handleAddExpense={handleAddExpense}
            equal={equal}
            setEqual={setEqual}
            payer={payer}
            setPayer={setPayer}
            handleCheckboxChange={handleCheckboxChange}
            involved={involved}
            handleSetToggle={handleSetToggle}
          />
        </div>
      ) : (
        <div className="m-2 p-2">
          <Home people={people} handleSetToggle={handleSetToggle} />
          <div className="m-2 p-2">
            Items List:
            <div className="bg-blue-200">
              <Items list={list} handleItemDelete={handleItemDelete} />
            </div>
          </div>
        </div>
      )}
      {/* {!toggle ? (
        <button onClick={handleSetToggle} className="border-2 border-black">
          Add Expense
        </button>
      ) : (
        <div>
          <AddExpenses
            people={people}
            desc={desc}
            setDesc={setDesc}
            amt={amt}
            setAmt={setAmt}
            handleAddExpense={handleAddExpense}
            equal={equal}
            setEqual={setEqual}
            payer={payer}
            setPayer={setPayer}
            handleCheckboxChange={handleCheckboxChange}
            involved={involved}
          />
        </div>
      )}
      {toggle ? (
        <button onClick={setToggle(false)}>Go to home</button>
      ) : (
        <div className="col-span-2 m-2 p-2">
          Items List:
          <div className="bg-blue-200">
            <Items list={list} handleItemDelete={handleItemDelete} />
          </div>
        </div>
      )} */}
    </div>
  );
}

export default App;
