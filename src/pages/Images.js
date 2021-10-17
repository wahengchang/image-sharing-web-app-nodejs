import { useEffect, useState } from "react";
import { getImageList } from "../lib/apis";
import {useAuth} from '../lib/auth'
import {
  Link,
} from "react-router-dom";
import './Images.css'

function timeAgo(input) {
  const date = (input instanceof Date) ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}

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
        <td>{timeAgo(item.updatedAt)}</td>
      </tr>
    ))
  }

  return <div >
      <h3>{username}'s Images <Link class='buttonTag' to='/images/create'> Add </Link></h3>
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