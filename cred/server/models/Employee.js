const mongoose = require("mongoose");

const EmpSchema = new mongoose.Schema({
  empName: {
    type: String,
    requried: true,
  },
  empPH: {
    type: Number,
    requried: true,
  },
});

const Employee = mongoose.model("Employee", EmpSchema);
module.exports = Employee;
