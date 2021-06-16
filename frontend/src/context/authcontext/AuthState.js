import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import SetAuthToken from '../../tokenutils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    // @todo - load token into global headers need to make a new file
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      // Call LoadUser Function
      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // Login User
  const loginUser = () => {
    console.log('Login User');
  };

  // Log-out
  const logOut = () => {
    console.log('log out users');
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        loadUser,
        register,
        loginUser,
        logOut,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
