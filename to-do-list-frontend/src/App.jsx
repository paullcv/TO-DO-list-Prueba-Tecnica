import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ShowTasks from './components/ShowTasks'
import CreateTask from './components/CreateTask'
import EditTask from './components/EditTask'



const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <ShowTasks/> } />
                <Route path='/create' element={ <CreateTask/> } />
                <Route path='/edit/:id' element={ <EditTask/> } />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
