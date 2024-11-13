import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from './redux/employees/employeesSlice';

const store = configureStore({
    reducer: {
        employees: employeesReducer,
      },
});

export default store;