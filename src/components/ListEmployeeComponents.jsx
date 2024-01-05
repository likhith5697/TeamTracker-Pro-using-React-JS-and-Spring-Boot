import React, { useEffect, useState } from 'react'
import { listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import {deleteEmployee} from '../services/EmployeeService';

const ListEmployeeComponents = () => {

    const [employeeData,setEmployeeData] = useState([]);
    const navigator = useNavigate();

    useEffect( ()=> {
        getAllEmployees();
    },[] )

    function getAllEmployees(){
        listEmployees().then( (response) => {
            setEmployeeData(response.data)
        } ).catch(error => {
            console.error(error);
        })
    }
    function addNewEmployee(){
        navigator('/add-employee');
      }

      function updateEmployee(employeeId){
        navigator(`/edit-employee/${employeeId}`);
      }
      function removeEmployee(employeeID){
        deleteEmployee(employeeID).then((response)=>{
            console.log(response.data);
        })
      }

 
  return (
    <div className='container'>
      <h2 className='text-center'>List of Employees</h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th> Employee Id</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Operations</th>
            </tr>
        </thead>
        <tbody>
            {
                employeeData.map( (employee) =>  
                <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                        <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Edit</button>
                        <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>Delete</button>
                    </td>
                </tr>)
            }
        </tbody>
      </table>
    </div>
  )
}

export default ListEmployeeComponents
