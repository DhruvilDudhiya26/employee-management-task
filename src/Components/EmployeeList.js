import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteEmployee, updateEmployee } from '../redux/employees/employeesSlice';
import { useFetchEmployees } from '../Hooks/useFetchEmployee';

const EmployeeList = () => {
    useFetchEmployees();
    const dispatch = useDispatch();

    const employeesData = useSelector((state) => state.employees.list);

    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedPosition, setEditedPosition] = useState('');
    const [editedEmail, setEditedEmail] = useState('');

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/employees/${id}`);
            dispatch(deleteEmployee(id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleStartEdit = (employee) => {
        setEditingEmployeeId(employee.id);
        setEditedName(employee.name);
        setEditedPosition(employee.position);
        setEditedEmail(employee.email);
    };

    const handleCancelEdit = () => {
        setEditingEmployeeId(null);
        setEditedName('');
        setEditedPosition('');
        setEditedEmail('');
    };

    const handleUpdate = async (id) => {
        try {
            const updatedData = {
                name: editedName,
                position: editedPosition,
                email: editedEmail,
            };
            const response = await axios.patch(`/api/employees/${id}`, updatedData);
            console.log('API response for update:', response.data);
            if (response.data) {
                dispatch(updateEmployee(response.data));
            } else {
                console.error('Update failed: Missing ID in response');
            }
            handleCancelEdit();
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="employee-list">
            <h1>Employees List</h1>
            <ul className="employee-list__items">
                {employeesData.map((employee, index) => (
                    <li className="employee-list__item" key={employee.id || index}>
                        {employee.id === editingEmployeeId ? (
                            <div className="employee-list__edit-form">
                                <input
                                    className="employee-list__input"
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                />
                                <input
                                    className="employee-list__input"
                                    type="text"
                                    value={editedPosition}
                                    onChange={(e) => setEditedPosition(e.target.value)}
                                />
                                <input
                                    className="employee-list__input"
                                    type="email"
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                />
                                <div className="employee-list__actions">
                                    <button className="employee-list__button" onClick={() => handleUpdate(employee.id)}>Save</button>
                                    <button className="employee-list__button" onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="employee-list__details">
                                <span className="employee-list__name">{employee.name}</span>
                                <span className="employee-list__position">{employee.position}</span>
                                <span className="employee-list__email">{employee.email}</span>
                                <div className="employee-list__actions">
                                    <button className="employee-list__button" onClick={() => handleDelete(employee.id)}>Delete</button>
                                    <button className="employee-list__button" onClick={() => handleStartEdit(employee)}>Edit</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
