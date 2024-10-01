import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Allusers from '../Components/Allusers'
import Header from '../Layout/Header'

const Routing = () => {
  return (
    <div>
        <Router>
            <Header/>
             <Allusers/>
            <Routes>
                <Route path='allusers'element={<Allusers/>}/>
            </Routes>
        </Router>
    </div>
  )
}

export default Routing
