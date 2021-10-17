import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Me from './pages/Me'
import Images from './pages/Images'
import ImagesCreate from './pages/ImagesCreate'
import AuthButton from './components/AuthButton'
import PrivateRoute from './PrivateRoute'
import RequiredLogoutRoute from './RequiredLogoutRoute'
import {ProvideAuth} from './lib/auth'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
                  <Link to="/images">Images Page</Link>
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
              <PrivateRoute path="/images/create">
                <ImagesCreate />
              </PrivateRoute>
              <PrivateRoute path="/images">
                <Images />
              </PrivateRoute>
              <PrivateRoute path="/me">
                <Me />
              </PrivateRoute>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ProvideAuth>
  );
}
