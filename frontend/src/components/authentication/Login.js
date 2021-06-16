import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alertcontext/AlertContext';
import AuthContext from '../../context/authcontext/AuthContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext); //init AlertContext
  const authContext = useContext(AuthContext); //init AuhtContext

  const { setAlert } = alertContext; //pullout the alert function from state
  const { loginUser, isAuthenticated, error, clearErrors } = authContext; //pullout the all function from the authState

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); //useEffect make a function

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user; //destructuring

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please Fill-out All Fields', 'danger');
    } else {
      loginUser({
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-success'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary btn-block'
          value='Login'
        />
      </form>
    </div>
  );
};

export default Login;
