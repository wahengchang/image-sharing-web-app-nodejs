import {
    useHistory,
  } from "react-router-dom";
  import {useAuth} from '../lib/auth'

export default function AuthButton() {
    const history = useHistory();
    const auth = useAuth();

    console.log('auth.user: ', auth.user)
  
    return auth.user ? (
      <p>
        Welcome! {auth.user.username}{" "}
        <button
          onClick={() => {
            auth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    );
  }
  