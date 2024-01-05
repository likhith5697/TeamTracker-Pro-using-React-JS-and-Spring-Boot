import { useState } from 'react'
import './App.css'
import ListEmployeeComponents from './components/ListEmployeeComponents'
import HeaderComponent from './components/HeaderComponent'
import FooterComponents from './components/FooterComponents'
import { BrowserRouter } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <HeaderComponent/>
    <Routes>
      <Route path='/' element={<ListEmployeeComponents/>}></Route>
      <Route path='/employees' element={<ListEmployeeComponents/>}></Route>
      <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
      <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
    </Routes>
   <FooterComponents/>
    </BrowserRouter>
    </>
  )
}

export default App
