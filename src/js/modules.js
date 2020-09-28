import axios from 'axios';

const loadMapData = () => {

  axios.get('http://localhost:5000/maps/')
    .then(response => {
      console.log("AXIOS:");
      console.log(response.data);
      return (response.data);
    })
    .catch((error) => {
      console.log(error);
    })
}

const log = (message) => {
  console.log ? console.log(message) : alert(message);
}

export { loadMapData, log }
