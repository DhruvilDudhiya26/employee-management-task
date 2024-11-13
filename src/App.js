import { Provider } from 'react-redux';
import './App.css';
import EmployeeList from './Components/EmployeeList';
import store from './store';
import EmployeeForm from './Components/EmployeeForm';
function App() {
  return (
   <Provider store={store}>
   <div className='employeeData'>
    <EmployeeList />
    <EmployeeForm />
   </div>
   </Provider>
  );
}

export default App;
