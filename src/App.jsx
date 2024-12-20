import { useEffect, useRef, useState } from "react";
import "./App.css";
import Items from "./components/Items";
import Header from "./components/Header";
import Home from "./components/Home";
import AddExpenses from "./components/AddExpenses";
import axios from "axios";

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
    // {
    //   id: 0,
    //   name: "Hitesh",
    //   amount: 0,
    //   spent: 0,
    //   toHitesh: 0,
    //   toKirti: 0,
    //   toVarun: 0,
    // },
    // {
    //   id: 1,
    //   name: "Kirti",
    //   amount: 0,
    //   spent: 0,
    //   toHitesh: 0,
    //   toKirti: 0,
    //   toVarun: 0,
    // },
    // {
    //   id: 2,
    //   name: "Varun",
    //   amount: 0,
    //   spent: 0,
    //   toHitesh: 0,
    //   toKirti: 0,
    //   toVarun: 0,
    // },
  ]);

  function handleDebtSimplification() {
    // write logic here to simplify debts
  }
  const handleCheckboxChange = (name) => {
    setInvolved((prev) => {
      if (prev.includes(name)) {
        // If person is already involved, remove them
        return prev.filter((p) => p !== name);
      } else {
        // Otherwise, add them to the list
        return [...prev, name];
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
    axios.post('http://localhost:8000/api/items/addItem',{data: {desc, amt, payer, involved, today}}).then((res)=>{
      console.log("Item Created succesfully")
    }).catch(()=> console.log("error creating item"))

    const updatedPeople = people.map((person) => {
      if (person.name === payer) {
        return {
          ...person,
          amount: person.amount + (amt / involved.length - amt),
          spent: person.spent + 1 * amt,
        };
      } else {
        const payerKey = `to${payer}`;
        if (involved.includes(person.name)) {
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
    axios.put('http://localhost:8000/api/people/updateAll',{data: {updatedPeople}})
    // axios.post('http://localhost:8000/api/people/')
    handleDebtSimplification();
    setAmt(0);
    setDesc("");
    setInvolved([]);
  }
  function handleReset(){
    axios.put('http://localhost:8000/api/people/reset')
  }
  function handleItemDelete(item) {
    console.log(item)
    const updatedPeople = people.map((person) => {
      if (person.name === payer) {
        return {
          ...person,
          amount: person.amount - (item.amt / involved.length - amt),
          spent: person.spent - 1 * item.amt,
        };
      } else {
        // if(person.id in involved){}
        const payerKey = `to${item.payer}`;
        if (item.involved.includes(person.name)) {
          return {
            ...person,
            amount:
              person.amount -
              Math.round((item.amt / item.involved.length) * 100) / 100,
            [payerKey]:
              person[payerKey] -
              Math.round((item.amt / item.involved.length) * 100) / 100,
          };
        } else return { ...person };
      }
    });
    setPeople(updatedPeople);
    axios.put('http://localhost:8000/api/people/updateAll',{data: {updatedPeople}})
    const newItems = list.filter((itm) => {
      return item._id !== itm._id;
    });

    

    setList(newItems);
    const itemId = item._id;
    console.log(itemId)
    axios.delete('http://localhost:8000/api/items/deleteItem',{data: {id: itemId}})

  }

  function handleSetToggle() {
    setToggle((val) => {
      if (val) return false;
      else return true;
    });
  }

  useEffect(() => {
    axios.get("http://localhost:8000/api/items/allItems").then((res) => {
      setList(res.data);
      console.log(res.data);
    });
    axios.get("http://localhost:8000/api/people/allPeople").then((res) => {
      // console.log(res.data)
      setPeople(res.data);
    }).catch((err)=>{
      console.log(err)
    });
  }, [list]);
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
          <Home people={people} handleSetToggle={handleSetToggle} handleReset = {handleReset}/>
          <div className="m-2 p-2">
            Items List:
            <div className="bg-blue-200">
              <Items list={list} handleItemDelete={handleItemDelete} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
