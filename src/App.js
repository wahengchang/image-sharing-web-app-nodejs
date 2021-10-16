import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Me from './pages/Me'
import Protect from './pages/Protect'
import AuthButton from './components/AuthButton'
import PrivateRoute from './PrivateRoute'
import RequiredLogoutRoute from './RequiredLogoutRoute'
import {useAuth, ProvideAuth} from './lib/auth'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default function AuthExample() {
  return (
    <ProvideAuth>
      <Router>
      <div class='container'>
          <header>
            <div class="nav">
              <ul>
                <li>
                  <Link to="/public">Home</Link>
                </li>
                <li>
                  <Link to="/protected">Protected Page</Link>
                </li>
                <li> 
                  <AuthButton />
                </li>
              </ul>
            </div>
          </header>
          <div class='content'>
            <Switch>
              <Route path="/public">
                <Home />
              </Route>
              <RequiredLogoutRoute path="/login">
                <Login />
              </RequiredLogoutRoute>
              <PrivateRoute path="/protected">
                <Protect />
              </PrivateRoute>
              <PrivateRoute path="/me">
                <Me />
              </PrivateRoute>
            </Switch>
          </div>
        </div>
      </Router>
    </ProvideAuth>
  );
}
