import { useEffect, useState } from "react";
import { uploadImage, createImage } from "../lib/apis";
import { useAuth } from '../lib/auth'

export default function Images() {
  const auth = useAuth();
  const { user } = auth
  const { username, } = user
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('file', file)
      const imageUrl = await uploadImage(formData)
      const res2 = await createImage({
        title, description, imageUrl
      })
    }
    catch (e) {
      console.log('onSubmit: ', e)
    }
  }

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }


  return (
    <div className="container">
      <h3>{username} Create Image</h3>
      <div className="row">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} required />
          </div>
          <div className="form-group">
            <input type="text" name="description" value={description} onChange={({ target }) => setDescription(target.value)} required />
          </div>
          <div className="form-group">
            <input type="file" onChange={onFileChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  )

}