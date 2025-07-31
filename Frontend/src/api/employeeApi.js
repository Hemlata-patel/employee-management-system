// src/api/employeeApi.js
import axios from 'axios';

// ✅ Base Axios instance with cookie support
const API = axios.create({
  baseURL: 'https://employee-management-system-backend-nw0a.onrender.com/api',// backend URL http://localhost:5000/api'
  withCredentials: true, // send cookies
});

// ✅ GET all employees
export const getEmployees = async () => {
  const response = await API.get('/employees');
  return response.data;
};

// ✅ GET one employee
export const getEmployeeById = async (id) => {
  const response = await API.get(`/employees/${id}`);
  return response.data;
};

// ✅ POST new employee
export const addEmployee = async (employeeData) => {
  const response = await API.post('/employees', employeeData);
  return response.data;
};

// ✅ PUT update employee
export const updateEmployee = async (id, employeeData) => {
  const response = await API.put(`/employees/${id}`, employeeData);
  return response.data;
};

// ✅ DELETE employee
export const deleteEmployee = async (id) => {
  const response = await API.delete(`/employees/${id}`);
  return response.data;
};

// ✅ POST salary entry
export const addSalaryEntry = async (id, salaryData) => {
  const response = await API.post(`/employees/${id}/salary`, salaryData);
  return response.data;
};
