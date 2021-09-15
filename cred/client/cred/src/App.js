import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToList = () => {
    console.log(foodName, days);
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
    window.location.reload();
  };

  const updateFood = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName,
    });
    window.location.reload();
  };

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);

    window.location.reload();
  };

  return (
    <div className="App">
      <div className="Welcome">
        <h1> WELCOME TO FOOD CRUD APP </h1>
      </div>

      <label>Food Name</label>
      <br></br>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      />
      <br></br>
      <br></br>
      <br></br>
      <label>Days Since You Ate</label>
      <br></br>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />

      <br></br>
      <br></br>

      <button onClick={addToList}>Add to List</button>

      <br></br>
      <br></br>

      <h2> DB RECORDS </h2>

      {foodList.map((val, key) => {
        return (
          <div key={key} className="db">
            <h3> Food Name : {val.foodName} </h3>
            <h3> Days Since : {val.daysSinceIAte} </h3>

            <input
              type="text"
              placeholder="New Food Name"
              onChange={(event) => {
                setNewFoodName(event.target.value);
              }}
            />
            <br></br>
            <button onClick={() => updateFood(val._id)}> Update </button>

            <br></br>
            <br></br>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
