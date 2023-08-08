import { Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './components/user/Main'
import Login from './components/admin/Login'
import { CodeContextProvider } from './context/context'
import Code from './components/user/Code'
import Dashboard from './components/admin/Dashboard/Dashboard'
import Explanation from './components/user/Explanation'
import EditDasboard from './components/admin/Edit/EditDasboard'


function App() {



  return (
    <CodeContextProvider value={{}}>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/code/:id' element={<Code />} />
        <Route path='/dashboard-basic' element={<Dashboard />} />
        <Route path='/dashboard-edit/:id' element={<EditDasboard />} />
        <Route path='/explanation/:id' element={<Explanation />} />
      </Routes>
       
    </CodeContextProvider>
  )
}

export default App
