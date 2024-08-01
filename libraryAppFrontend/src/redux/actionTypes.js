import axios from "axios";

export const LOGIN_UPDATE_FORM_DATA = "login/updateFormState";
export const LOGIN_LOADING = "login/loginLoading";
export const LOGIN_ERROR = "login/loginError";
export const LOGIN_UPDATE_AUTH_DATA = "login/updateAuthData";

export const handleLogin = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    const response = await axios.post(
      "http://localhost:8000/api/user/login",
      formData
    );
    console.log(response.data);
    dispatch({
      type: LOGIN_UPDATE_AUTH_DATA,
      payload: {
        isAuth: true,
        role: response.data.role,
        token: response.data.token,
        msg: response.data.msg,
      },
    });
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error.response.data.msg,
    });
  }
};

export const handleLogout = (authState) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    const response = await axios.get("http://localhost:8000/api/user/logout", {
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    });
    dispatch({
      type: LOGIN_UPDATE_AUTH_DATA,
      payload: {
        isAuth: false,
        role: null,
        token: null,
      },
    });
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error.response.data.msg,
    });
  }
};
