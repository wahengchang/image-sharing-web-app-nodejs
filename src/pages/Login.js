import { useAuth } from "../lib/auth";
import { useState } from 'react';
import {
  useLocation,
  useHistory
} from "react-router-dom";

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { from } = location.state || { from: { pathname: "/" } };

  const clickHandlerLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      await auth.signin(username.value, password.value )
      setLoading(false)
      history.push('/')
    }
    catch(error) {
      setLoading(false);
      setError(JSON.stringify(error));
    }
      
  };

  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={clickHandlerLogin} disabled={loading} /><br />
    </div>
  );
}

