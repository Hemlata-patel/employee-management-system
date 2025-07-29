import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const salaryHistorySchema = new Schema({
  amount: Number,
  date: { type: Date, default: Date.now },
});

const employeeSchema = new Schema(
  {
    name: String,
    role: String,
    email: String,
    salaryHistory: [salaryHistorySchema],
  },
  { timestamps: true }
);

const Employee = model('Employee', employeeSchema);

export default Employee;
