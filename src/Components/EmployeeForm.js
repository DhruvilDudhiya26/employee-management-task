import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addEmployee } from '../redux/employees/employeesSlice';


const EmployeeForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [email , setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/employees', { name, position, email });
      const employeeData = response.data.employee || response.data; // Ensures employee is at the root level
      console.log(employeeData);
      
      dispatch(addEmployee(employeeData));
      setName('');
      setPosition('');
      setEmail('');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };
  

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h1>Add Employee</h1>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
      </div>
      <button className="btn btn-primary" type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;