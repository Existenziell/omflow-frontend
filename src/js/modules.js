async function loadMapData() {
  let response = await fetch(`http://localhost:5000/maps/`);
  let data = await response.json()
  return data;
}

const log = (message) => {
  console.log ? console.log(message) : alert(message);
}

export { loadMapData, log }
