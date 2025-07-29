import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../api/employeeApi";
import "./AddEmployee.css"; // Import external CSS

export default function AddEmployee() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      name: form.name,
      email: form.email,
      role: form.role,
      salaryHistory: [
        {
          amount: Number(form.salary),
          date: new Date().toISOString(),
        },
      ],
    };

    await addEmployee(employeeData);
    navigate("/");
  };

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          required
        />
        <input
          name="salary"
          type="number"
          value={form.salary}
          onChange={handleChange}
          placeholder="Initial Salary"
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
