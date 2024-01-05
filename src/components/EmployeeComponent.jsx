import React, { useEffect, useState } from 'react'
import { createEmployee, editEmployee, getEmployee } from '../services/EmployeeService';
import { useNavigate,useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');

    //get Employee Id from URL
    const{id} = useParams();
    const[errors,setErrors]= useState({
        firstName:'',
        lastName:'',
        email:''
    })
    
    const navigator = useNavigate();

    //pre-populate the edit window of the selected record that needs to be edited
    useEffect(() => {
        if(id){
                getEmployee(id).then((response)=>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.log(error);
            })
        }
    },[id])
    
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastName = (e) => {
        setLastName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    //function to create a new entry of an employee in database
    //Connect to db (RESTful API)
    const saveOrEditEmployee = (e) => {
        e.preventDefault();
        
        if(validateForm()){
            const employee = {firstName,lastName,email};
        //If Employee Id is present in the URL (which means when edit API is triggered)
        if(id){
            editEmployee(id,employee).then((response)=>{
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
            });
        }
        else{
            createEmployee(employee).then((response)=>{
            console.log(response.data);
            navigator('/employees');
            })
        }
        }
    }

    //If employeeID is present in URL, then return page title as Update employee, else add Employee 
    const pageTitle = ()=>{
        if(id){
            return <h2 className='text-center'>Update Employee</h2>;
        }
        else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    const validateForm =()=>{
        let valid = true;
        const errorsCopy = {... errors}
        if(firstName.trim()){
            errorsCopy.firstName=''
        }
        else{
            errorsCopy.firstName='First Name is required'
            valid = false;
        }
        if(lastName.trim()){
            errorsCopy.lastName = ''
        }
        else{
            errorsCopy.lastName='Last Name is required'
            valid = false;
        }
        if(email.trim()){
            errorsCopy.email=''
        }
        else{
            errorsCopy.email='Email is required'
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }
  return (
    <div className='container'>
        <br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Employee First Name : </label>
                            <input className={`form-control ${errors.firstName ? 'is-invalid':''}`} type ='text' placeholder='Enter first name of employee' name='firstName' value={firstName} 
                            onChange={handleFirstName}
                            ></input>
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                            <label className='form-label'>Employee Last Name : </label>
                            <input className={`form-control ${errors.lastName ? 'is-invalid':''}`} type ='text' placeholder='Enter Last name of employee' name='lastName' value={lastName} 
                            onChange={handleLastName}
                            ></input>
                             {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                             </div>
                             <div className='form-group mb-2'>
                            <label className='form-label'>Employee Email : </label>
                            <input className={`form-control ${errors.email ? 'is-invalid':''}`} type ='text' placeholder='Enter Email of employee' name='email' value={email} 
                            onChange={handleEmail}
                            ></input>
                             {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrEditEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent