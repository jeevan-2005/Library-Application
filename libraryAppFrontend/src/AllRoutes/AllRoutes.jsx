import {Navigate, Route, Routes} from 'react-router-dom'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Admin from '../Users/Admin/Admin'
import Student from '../Users/Student/Student'
import ProtectedComponent from '../components/protectedComponent/ProtectedComponent'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/admin' element={<ProtectedComponent role="ADMIN" ><Admin /></ProtectedComponent>} />
        <Route path='/student' element={<ProtectedComponent role="STUDENT" ><Student /></ProtectedComponent>} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default AllRoutes
