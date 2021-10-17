import { useEffect, useState } from "react";
import { getImageList } from "../lib/apis";
import {useAuth} from '../lib/auth'
import {
  Link,
} from "react-router-dom";
import './Images.css'

export default function Images() {
  const [imageList, setImageList] = useState(null);
  const auth = useAuth();
  const {user} = auth
  const {username,} = user

  useEffect(async () => {
    const imageList = await getImageList()
    setImageList(imageList)
  }, []);

  const renderTable = () => {
    if (!imageList) return 'You did not upload any image'
    return imageList.map(item => (
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td><img class='thumbnail' src={'//'+item.imageUrl} /></td>
        <td>{item.updatedAt}</td>
      </tr>
    ))
  }

  return <div >
      <h3>{username}'s Images <Link to='/images/create'> + </Link></h3>
      <div class='tableContainer'>
        <table>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>imageUrl</th>
            <th>updatedAt</th>
          </tr>
          {renderTable()}
        </table>
      </div>
    </div>;
}