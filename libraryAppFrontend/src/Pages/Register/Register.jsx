import React, { useState } from 'react';
import axios from 'axios'

const Register = () => {
    // const [formState, setFormState] = useState({
    //     email: "",
    //     password:"",
    //     role:""
    // })

    // const handleFormSubmit =async (e)=>{
    //     e.preventDefault();
    //     const user = {...formState}
    //     axios.post('http://localhost:8000/api/user/register', user)
    //     .then(response => {
    //         console.log(response)
    //     })
    // }

  return (
    // <form action="" onSubmit={handleFormSubmit} >
    //     <input type="email" value={formState.email} onChange={(e)=>setFormState({...formState,email: e.target.value})} />
    //     <input type="password" value={formState.password} onChange={(e)=>setFormState({...formState,password: e.target.value})}/>
    //     <select name="" id="" value={formState.role} onChange={(e)=>setFormState({...formState,role: e.target.value})}>
    //         <option value="">select user type</option>
    //         <option value="student">student</option>
    //         <option value="admin">admin</option>
    //     </select>
    //     <input type="submit" value="Submit"/>
    // </form>
    <div>regitster</div>
  )
}

export default Register
