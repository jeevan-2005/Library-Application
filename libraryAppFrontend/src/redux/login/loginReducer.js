import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_UPDATE_AUTH_DATA, LOGIN_UPDATE_FORM_DATA, } from "../actionTypes";

const initialState = {
  loading: false,
  data: { email: "", password: "", role: "" },
  authState: {
    isAuth: false,
    role: null,
    token: null,
  },
  error: "",
};

export const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_LOADING:
      return { ...state, loading: true };
    case LOGIN_ERROR:
      return { ...state, loading: false, error: payload };
    case LOGIN_UPDATE_FORM_DATA:
      return { ...state, loading: false, data: payload };
    case LOGIN_UPDATE_AUTH_DATA:
      return { ...state, loading: false, authState: payload, error: "" };
    default:
      return state;
  }
};
