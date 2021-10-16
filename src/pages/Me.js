import {
  useHistory,
} from "react-router-dom";
import {useAuth} from '../lib/auth'

export default function ProtectedPage() {
  const history = useHistory();
  const auth = useAuth();
  const {user} = auth
  const {id, username, updatedAt, uploadedImageAmount} = user

  return <div>
      <h3>Hi {username}</h3>
      <div>
        <div> ID: {id}</div>
        
        <div> uploadedImageAmount: {uploadedImageAmount}</div>

        <div> updatedAt: {updatedAt}</div>

        
        <button
          onClick={() => {
            auth.signout(() => history.push("/"));
          }}
        >
          Logout
        </button>
      </div>
    </div>;
}