import { useEffect, useState } from "react";
import { uploadImage, createImage } from "../lib/apis";
import { useAuth } from '../lib/auth'
import { useToasts } from "../components/ToastContainer";

export default function Images() {
  const {add} = useToasts()
  const auth = useAuth();
  const { user } = auth
  const { username, } = user
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorValidList, setErrorValidList] = useState({});


  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      if(!file) {
        return setErrorValidList({file: 'File is required'})
      }

      const formData = new FormData()
      formData.append('file', file)
      const imageUrl = await uploadImage(formData)
      const res2 = await createImage({
        title, description, imageUrl
      })
      add(`${title} image upload Success`)
    }
    catch (e) {
      console.log('onSubmit: ', e)
    }
  }

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div class='formPageContainer'>
      <h3>{username} Create Image</h3>
      <div className="formContainer">
        <form onSubmit={onSubmit}>
          <div className="formGroup">
            Title<br />
            <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} required />
          </div>
          <div className="formGroup">
            Description<br />
            <input type="text" name="description" value={description} onChange={({ target }) => setDescription(target.value)} required />
          </div>
          <div className="formGroup">
            Image<br />
            <input type="file" name="attachment[]"  onChange={onFileChange} />
            {errorValidList.file && <><br /><small style={{ color: 'red' }}>{errorValidList.file}</small><br /></>}
          </div>
          <div className="formGroup">
            <button className="btn btn-primary" type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  )

}