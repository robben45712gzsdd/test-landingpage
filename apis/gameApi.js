import axios from 'axios';

const BASE_URL = 'http://154.26.134.211:8090/api/Game';

export function getListGame() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/GetListGame`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
