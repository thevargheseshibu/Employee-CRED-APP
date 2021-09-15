const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const FoodeModel = require("./models/Food");
app.use(express.json());
app.use(cors());

var uri =
  "mongodb://creduser:cred@cluster0-shard-00-00.ozepx.mongodb.net:27017,cluster0-shard-00-01.ozepx.mongodb.net:27017,cluster0-shard-00-02.ozepx.mongodb.net:27017/food?ssl=true&replicaSet=atlas-innouw-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true });

app.post("/insert", async (req, res) => {
  const foodname = req.body.foodName;
  const days = req.body.days;

  const food = new FoodeModel({ foodName: foodname, daysSinceIAte: days });

  try {
    await food.save();
    res.send("inserdata");
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;

  try {
    await FoodeModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send("update");
      if (err) {
        res.send("Err update");
      }
    });
    await food.save();
    res.send("inserdata");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  FoodeModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodeModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
