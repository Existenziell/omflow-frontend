// Asynchron fetch of mapdata (used in grocoder in map.js)
async function loadMapData() {
  let response = await fetch(`http://localhost:5000/maps/`);
  let data = await response.json()
  return data;
}

export { loadMapData }
