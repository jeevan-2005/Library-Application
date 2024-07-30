import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [formState, setFormState] = useState({
        email: "",
        password:"",
        role:""
    })
    const {authState ,handleLogin} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(authState.role === "ADMIN"){
            navigate("/admin")
        }else if(authState.role === "STUDENT"){
            navigate("/student")
        }
        console.log(authState.role)
    }, [authState.role])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formState)
        await handleLogin(formState)
    }

    return (<>
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email:</label>
            <input 
                type="email" 
                id="email"
                value={formState.email} 
                onChange={(e) => setFormState({ ...formState, email: e.target.value })} 
                required 
            />
            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                id="password"
                value={formState.password} 
                onChange={(e) => setFormState({ ...formState, password: e.target.value })} 
                required 
            />
            <label htmlFor="role">Role:</label>
            <select 
                id="role" 
                value={formState.role} 
                onChange={(e) => setFormState({ ...formState, role: e.target.value })} 
                required
            >
                <option value="">Select user type</option>
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Admin</option>
            </select>
            <input type="submit" value="Submit" />
        </form>

        <button onClick={() => navigate("/register")} >dont have an account</button>
        </>
    )
}

export default Login
