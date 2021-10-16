import {
  Route,
  Redirect
} from 'react-router-dom';
import {useAuth} from './lib/auth'


export default function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/public",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
