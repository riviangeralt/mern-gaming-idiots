import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.rawg.io/api",
})

export default instance
// export const updateGames = async (pageNo) => {
//   const url =
//     `https://api.rawg.io/api/games?key=eb2d6b2abf9b47bdaecb8feaedfd758b&page=${pageNo}`;
//   const data = await axios.get(url).catch(err => console.log('Error:', err))
//   return data
// };

// export const gameDetails = async (gameId) => {
//   const url =
//     `https://api.rawg.io/api/games/${gameId}?key=eb2d6b2abf9b47bdaecb8feaedfd758b`;
//   const data = await fetch(url);
//   const gameDetailsData = await data.json();
//   return gameDetailsData;
// };