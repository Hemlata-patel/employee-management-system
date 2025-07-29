import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../api/employeeApi';
import EmployeeCard from '../components/EmployeeCard';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/authApi';
import './Home.css';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmployees();
        setEmployees(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/add');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>👩‍💼 Employee Dashboard</h1>
        <div className="dashboard-actions">
        <button onClick={handleAdd} className="add-btn">➕ Add Employee</button>
         <button onClick={handleLogout} className="logout-btn">Logout</button>
         </div>
      </div>

      {loading ? (
        <p className="loading">Loading employees...</p>
      ) : employees.length > 0 ? (
        <div className="employee-list">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee._id}
              employee={employee}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <p className="no-employees">No employees found.</p>
      )}
    </div>
  );
};

export default Home;
