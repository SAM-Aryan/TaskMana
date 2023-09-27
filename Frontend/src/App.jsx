import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Login from './Pages/Login Page/Login.jsx'
import Dashboard from './Pages/Dashboard/dashboard.jsx';

export default function App() {

  return (
    <div className="no-scrollbar overflow-hidden">
      <div>
        <Dashboard/>
      </div>
    </div>
  )

}
