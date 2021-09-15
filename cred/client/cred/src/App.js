import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [empName, setempName] = useState("");
  const [empPH, setempPH] = useState("");
  const [empList, setempList] = useState([]);
  const [newempName, setNewempName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setempList(response.data);
    });
  }, []);

  const addToList = () => {
    console.log(empName, empPH);
    Axios.post("http://localhost:3001/insert", {
      empName: empName,
      empPH: empPH,
    });
    window.location.reload();
  };

  const updateEmp = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newempName: newempName,
    });
    window.location.reload();
  };

  const deleteEmp = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);

    window.location.reload();
  };

  return (
    <div className="App">
      <div className="Welcome">
        <h1> WELCOME TO Employee CRUD APP </h1>
      </div>

      <label>Employee Name</label>
      <br></br>
      <input
        type="text"
        onChange={(event) => {
          setempName(event.target.value);
        }}
      />
      <br></br>
      <br></br>
      <br></br>
      <label>Employee Phone Number</label>
      <br></br>
      <input
        type="number"
        onChange={(event) => {
          setempPH(event.target.value);
        }}
      />

      <br></br>
      <br></br>

      <button onClick={addToList}>Add to DB</button>

      <br></br>
      <br></br>

      <h2> DB RECORDS </h2>

      {empList.map((val, key) => {
        return (
          <div key={key} className="db">
            <h3> Employee Name : {val.empName} </h3>
            <h3> Employee Number : {val.empPH} </h3>

            <input
              type="text"
              placeholder="New Employee Name"
              onChange={(event) => {
                setNewempName(event.target.value);
              }}
            />
            <br></br>
            <button onClick={() => updateEmp(val._id)}> Update </button>

            <br></br>
            <br></br>
            <button onClick={() => deleteEmp(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
