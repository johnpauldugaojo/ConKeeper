import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authcontext/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  //...rest for create private route
  const authContext = useContext(AuthContext); //init AuhtContext
  const { isAuthenticated, loading } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
