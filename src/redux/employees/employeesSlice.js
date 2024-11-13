import { createSlice } from '@reduxjs/toolkit';

const initialState = { list: [], status: 'idle' };

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.list = action.payload.employees ? action.payload.employees : action.payload;
    },
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    },
    updateEmployee(state, action) {
      const updatedEmployee = action.payload.employee;
      const index = state.list.findIndex(employee => employee.id === updatedEmployee.id);
      console.log(index);
      if (index !== -1) {
        state.list[index] = updatedEmployee;
      }
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter((emp) => emp.id !== action.payload);
    },
  },
});

export const { setEmployees, addEmployee, updateEmployee, deleteEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
