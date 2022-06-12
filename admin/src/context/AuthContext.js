import { createContext, useEffect, useReducer } from 'react';
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from '../constant/actions';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        user: null,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return INITIAL_STATE;
    default: {
      return state;
    }
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  const contextData = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    dispatch,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
