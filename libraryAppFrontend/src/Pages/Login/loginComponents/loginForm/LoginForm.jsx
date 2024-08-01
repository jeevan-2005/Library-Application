import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  Box,
  InputAdornment,
  IconButton,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./_loginForm.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLogin,
  LOGIN_LOADING,
  LOGIN_UPDATE_FORM_DATA,
} from "../../../../redux/actionTypes";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, data, authState, error } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (authState.role === "ADMIN") {
      navigate("/admin");
    } else if (authState.role === "STUDENT") {
      navigate("/student");
    }
    console.log(authState.role);
  }, [authState.role]);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@iiitkota\.ac\.in$/;
    return regex.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email } = data;
    console.log(data);
    let validationErrors = {};

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      validationErrors.email =
        "Invalid email format. Please use an email ending with @iiitkota.ac.in";
    }
    console.log(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log(data);
    dispatch(handleLogin(data));

    if (authState.isAuth) {
      dispatch({
        type: LOGIN_UPDATE_FORM_DATA,
        payload: {
          email: "",
          password: "",
          role: "",
        },
      });
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="formContainer">
      <div className="loginForm">
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
            <AccountCircle
              sx={{ fontSize: "30px", color: "action.active", mr: 1, my: 0.3 }}
            />
            <TextField
              label="email"
              variant="standard"
              type="text"
              placeholder="abc@iiitkota.ac.in"
              id="email"
              fullWidth
              value={data.email}
              onChange={(e) =>
                dispatch({
                  type: LOGIN_UPDATE_FORM_DATA,
                  payload: { ...data, email: e.target.value },
                })
              }
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
            <LockIcon
              sx={{ fontSize: "30px", color: "action.active", mr: 1, my: 0.3 }}
            />
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={(e) =>
                  dispatch({
                    type: LOGIN_UPDATE_FORM_DATA,
                    payload: { ...data, password: e.target.value },
                  })
                }
                placeholder="password"
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          {/* <Link to="/forgotPassword">Forgot Password?</Link> */}
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              value={data.role}
              placeholder="Select user type"
              onChange={(e) =>
                dispatch({
                  type: LOGIN_UPDATE_FORM_DATA,
                  payload: { ...data, role: e.target.value },
                })
              }
              required
            >
              <MenuItem value="">Select user type</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="STUDENT">Student</MenuItem>
            </Select>
          </FormControl>
          {error && (
            <p style={{ color: "red", textAlign: "center", width: "100%",margin:0, padding:0 }}>{error}</p>
          )}
          <LoadingButton
            sx={{ width: "100%" }}
            type="submit"
            loading={loading}
            variant="contained"
          >
            Login
          </LoadingButton>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
