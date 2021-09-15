const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const EmpModel = require("./models/Employee");
app.use(express.json());
app.use(cors());

var uri =
  "mongodb://creduser:cred@cluster0-shard-00-00.ozepx.mongodb.net:27017,cluster0-shard-00-01.ozepx.mongodb.net:27017,cluster0-shard-00-02.ozepx.mongodb.net:27017/employee?ssl=true&replicaSet=atlas-innouw-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true });

app.post("/insert", async (req, res) => {
  const empName = req.body.empName;
  const empPH = req.body.empPH;

  const employee = new EmpModel({ empName: empName, empPH: empPH });

  try {
    await employee.save();
    res.send("inserdata");
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  const newempName = req.body.newempName;
  const id = req.body.id;

  try {
    await EmpModel.findById(id, (err, updatedEmp) => {
      updatedEmp.empName = newempName;
      updatedEmp.save();
      res.send("update");
      if (err) {
        res.send("Err update");
      }
    });
    await employee.save();
    res.send("inserdata");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  EmpModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await EmpModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
