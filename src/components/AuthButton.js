import {
    useHistory,
  } from "react-router-dom";
import {useAuth} from '../lib/auth'
import {
  Link,
} from "react-router-dom";

export default function AuthButton() {
    const history = useHistory();
    const auth = useAuth();
  
    return auth.user ? (
      <span>
        <Link to='/me'>Hi {auth.user.username}</Link>
      </span>
    ) : (
      <span>Logged in</span>
    );
  }
  