import { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedComponent = ({children, role}) => {
    const {authState} = useContext(AuthContext)
    const {isAuth, role: userRole} = authState
    if(userRole === role && isAuth) {
        return children
    }
    return <Navigate to="/login" />
}

export default ProtectedComponent
