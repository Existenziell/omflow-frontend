import axios from 'axios';

const loadJSON = () => {

  axios.get('http://localhost:5000/maps/')
    .then(response => {
      return (response.data);
    })
    .catch((error) => {
      console.log(error);
    })
}

const log = (message) => {
  console.log ? console.log(message) : alert(message);
}

export { loadJSON, log }
