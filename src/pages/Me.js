import {
  useHistory,
} from "react-router-dom";
import {useAuth} from '../lib/auth'
import { useToasts } from "../components/ToastContainer";

export default function ProtectedPage() {
  const {add} = useToasts()
  const history = useHistory();
  const auth = useAuth();
  const {user} = auth
  const {id, username, updatedAt, uploadedImageAmount} = user

  return <div class='formPageContainer'>
      <h3>Hi {username}</h3>
      <div>

        <div className="formGroup">
          <div> <b>ID:</b> {id}</div>
        </div>
        <div className="formGroup">
          <div> <b>uploadedImageAmount:</b> {uploadedImageAmount}</div>
        </div>
        <div className="formGroup">
          <div> <b>updatedAt:</b> {updatedAt}</div>
        </div>
        <div className="formGroup">
          <button
            onClick={() => {
              auth.signout(() => history.push("/"));
              add(`Logout Success`)
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>;
}