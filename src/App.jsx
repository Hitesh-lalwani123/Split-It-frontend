import { useEffect, useRef, useState } from "react";
import "./App.css";
import Items from "./components/Items";
import Header from "./components/Header";
import Home from "./components/Home";
import AddExpenses from "./components/AddExpenses";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router";
import handleDebtSimplification from "../handlers/debtSimplification";
import { SecondaryButtonTemplate } from "./templates/ButtonTemplate";
import axios from "axios";
import Loading from "./components/Loading";
//
function App() {
  const [list, setList] = useState([]);
  const [people, setPeople] = useState([]);
  const [backendup, setBackendup] = useState(1);

  const [allShayaris, setAllShayaris] = useState([]);

  const [loading, setLoading] = useState(false);
  const baseURL = "https://split-it-backend-v2.onrender.com";
  // const baseURL = "http://localhost:8000";
  useEffect(() => {
    async function testDB() {
      try {
        let res = await axios.get(baseURL);
        if (res.ok) console.log(res);
        setBackendup(2);
      } catch (error) {
        console.log("backend down");
        setBackendup(3);
      }
      setLoading(true);
      axios.get(`${baseURL}/api/items/allItems`).then((res) => {
        setList(res.data);
      });
      axios
        .get(`${baseURL}/api/people/allPeople`)
        .then((res) => {
          setPeople(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => setLoading(false));
      axios.get(`${baseURL}/api/shayari/getAll`).then((res) => {
        setAllShayaris(res.data);
      });
    }

    testDB();
  }, []);

  const [shayari, setShayari] = useState("");
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState(0);
  const [payer, setPayer] = useState(null);
  const [equal, setEqual] = useState(true);
  const [involved, setInvolved] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [item, setItem] = useState({});
  const [person, setPerson] = useState("Hitesh");

  // functions
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

  async function handleAddExpense(e) {
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
    if (amt === 0 || amt === "") {
      alert("please enter some amount");
      return;
    }

    e.preventDefault();
    setLoading(true);
    const updatedPeople = people.map((person) => {
      if (person.name === payer) {
        return {
          ...person,
          amount:
            person.amount +
            Math.round((amt / involved.length - amt) * 100) / 100,
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

    await axios.post(`${baseURL}/api/items/addItem`, {
      data: { desc, amt, payer, involved, today },
    });
    await axios.put(`${baseURL}/api/people/updateAll`, {
      data: { updatedPeople },
    });

    let res = await axios.get(`${baseURL}/api/items/allItems`);
    setList(res.data);

    // setPeople(updatedPeople);
    handleDebtSimplification();

    let ppl = await axios.get(`${baseURL}/api/people/allPeople`);

    setPeople(ppl.data);

    setAmt(0);
    setDesc("");
    setInvolved([]);
    setLoading(false);
  }
  function handleReset() {
    axios.put(`${baseURL}/api/people/reset`);
  }

  async function handleSubmitShayari(e) {
    await axios
      .post(`${baseURL}/api/shayari/create`, {
        data: { title: shayari, by: "admin" },
      })
      .then((res) => {
        alert(res.data.message);
      });
    let allshayaris = await axios.get(`${baseURL}/api/shayari/getAll`);
    setAllShayaris(allshayaris);
    setShayari("");
  }
  async function handleItemDelete(item) {
    const updatedPeople = people.map((person) => {
      if (person.name === item.payer) {
        return {
          ...person,
          amount: person.amount - (item.amt / item.involved.length - item.amt),
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
    setLoading(true);
    const itemId = item._id;
    await axios.delete(`${baseURL}/api/items/deleteItem`, {
      data: { id: itemId },
    });

    await axios.put(`${baseURL}/api/people/updateAll`, {
      data: { updatedPeople },
    });

    let itm = await axios.get(`${baseURL}/api/items/allItems`);
    setList(itm.data);
    let ppl = await axios.get(`${baseURL}/api/people/allPeople`);
    setPeople(ppl.data);
    setLoading(false);
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

      <Loading allShayaris={allShayaris} />

      {backendup === 3 ? (
        <div>Backend is down. Kindly Contact the Admin!!</div>
      ) : backendup === 1 ? (
        <div> Backend is Loading...</div>
      ) : (
        <>
          <div>
            <Header />
          </div>

          {loading ? (
            <div className="loading">Page is loading....</div>
          ) : (
            <div className=" bg-transparent h-10"> </div>
          )}
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
                item={item}
                setItem={setItem}
                loading={loading}
              />
            </div>
          ) : (
            <div className="m-2 p-2">
              <Home people={people} handleSetToggle={handleSetToggle} />
              <div className="m-2 p-2">
                Items List:
                <div>
                  <Items
                    list={list}
                    handleItemDelete={handleItemDelete}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          )}

          {/* <SecondaryButtonTemplate>
        <button onClick={handleReset}>Reset</button>
      </SecondaryButtonTemplate> */}
        </>
      )}
      <div>
        Bring out the shayar inside you!!
        <textarea
          placeholder="Enter your Shayari"
          className="border-2 border-black shadow-md shadow-black px-2"
          type="text"
          value={shayari}
          onChange={(e) => setShayari(e.target.value)}
        />
      </div>
      <SecondaryButtonTemplate>
        <button onClick={handleSubmitShayari}>Submit</button>
      </SecondaryButtonTemplate>
    </div>
  );
}

export default App;
