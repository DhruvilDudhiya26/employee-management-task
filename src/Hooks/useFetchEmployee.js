import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setEmployees } from '../redux/employees/employeesSlice';
import axios from 'axios';

export const useFetchEmployees = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get('/api/employees');
      dispatch(setEmployees(response.data));
    };
    fetchEmployees();
  }, [dispatch]);
};
