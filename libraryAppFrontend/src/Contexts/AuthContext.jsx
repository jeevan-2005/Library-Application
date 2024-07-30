import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuth: false,
    role: null,
    token: null,
    msg: "",
  });

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formData
      );
      console.log(response.data);
      setAuthState({
        isAuth: true,
        role: response.data.role,
        token: response.data.token,
        msg: response.data.msg,
      });
    } catch (error) {
      console.error(error.response.data.msg);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/logout",
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      setAuthState({
        isAuth: false,
        role: null,
        token: null,
        msg: response.data.msg,
      });
    } catch (error) {
      console.error(error.response.data.msg);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
