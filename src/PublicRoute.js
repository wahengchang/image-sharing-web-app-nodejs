import {
    Route,
    Redirect
  } from 'react-router-dom';
  
  function PublicRoute({ children, user, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            !user ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/home',
                  state: { from: location }
                }}
              />
            ))
        }
      />
    );
  }
  
  export default PublicRoute;