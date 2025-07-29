import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
  addSalaryEntry,
} from "../api/employeeApi";
import "./EditEmployee.css"; // <-- Import CSS

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [newSalary, setNewSalary] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const employee = await getEmployeeById(id);
      if (employee) {
        setForm({
          name: employee.name,
          email: employee.email,
          role: employee.role,
        });
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEmployee(id, form);
    if (newSalary) {
      await addSalaryEntry(id, { amount: Number(newSalary) });
    }
    navigate("/");
  };

  return (
    <div className="edit-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="edit-form">
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
          value={newSalary}
          onChange={(e) => setNewSalary(e.target.value)}
          type="number"
          placeholder="Add New Salary"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
