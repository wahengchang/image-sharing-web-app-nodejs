import { useAuth } from "../lib/auth";
import { useState } from 'react';
import {useFormInput} from '../lib/formUtil'
import {
  Link,
} from "react-router-dom";
import './Login.css'
import {
  useLocation,
  useHistory
} from "react-router-dom";

export default function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [errorValidList, setErrorValidList] = useState({});
  const [loading, setLoading] = useState(false);

  const errorValidationDisplay = (errorItem) => {
    const {param, msg} = errorItem

    setErrorValidList({
      ...errorValidList,
      [param]: msg
    })
  }

  const onClickLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      await auth.signin(username.value, password.value )
      setLoading(false)
      history.push('/')
    }
    catch(error) {
      const {errorValidation} = error

      console.log('error: ', error)

      const _validList = {}
      errorValidation.forEach(errorItem => {
        const {param, msg} = errorItem
        _validList[param] = msg
      })
      setErrorValidList(_validList)
      setLoading(false);
      setError(error.errorMessage);
    }
  };

  return (
    <div class='formPageContainer'>
      <h3>Login</h3>
      <div class='formContainer'>
        <div>
          Username<br />
          <input type="text" {...username} autoComplete="username" name='username'/>
          {errorValidList.username && <><br /><small style={{ color: 'red' }}>{errorValidList.username}</small><br /></>}
        </div>
        <div style={{ marginTop: 10 }}>
          Password<br />
          <input type="password" {...password} autoComplete="password" name='password'/>
          {errorValidList.password && <><br /><small style={{ color: 'red' }}>{errorValidList.password}</small><br /></>}
        </div>
        <div style={{ marginTop: 10 }}>
          <input id='loginSubmit' type="button" value={loading ? 'Loading...' : 'Login'} onClick={onClickLogin} disabled={loading} /><br />
        </div>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      </div>
      <Link id='sigupButton' to='/signup'> Signup </Link>
    </div>
  );
}

