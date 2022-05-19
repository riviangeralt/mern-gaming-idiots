import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/apiData";

let today = new Date();
let todayDate = today.toISOString().split("T")[0];
let monthAgo = new Date(today.setMonth(today.getMonth() - 1));
let monthAgoDate = monthAgo.toISOString().split("T")[0];

const initialState = {
  filtered: [],
  loading: false,
};

export const fetchFilteredGames = createAsyncThunk(
  "game/fetchFilteredGames", //name of thunk
  async (platform) => {
    //async thunk function
    const { console, page } = platform;
    const resp = await instance.get(
      `/games?key=c542e67aec3a4340908f9de9e86038af&page_size=50&page=${page}&updated=${monthAgoDate},${todayDate}`
    );
    if (console === "all") {
      //if all consoles are selected
      return resp.data.results; //return all games
    } else {
      //if a console is selected
      return resp.data.results //return games with that console
        .map(
          (respo) =>
            respo.platforms //map through the games
              .map((el) => (el.platform.slug === console ? respo : null)) //if the game has the selected console, return the game
              .filter((x) => x !== null) //filter out the nulls
        )
        .flat(); //flatten the array
    }
  }
);

export const filterSlicer = createSlice({
  name: "filtered", //name of slice
  initialState, //initial state
  reducers: {
    //reducers
    removeFilteredGames: (state) => {
      //remove all games from filtered
      return { ...state, filtered: [] }; //and reset filtered to empty array
    },
  },
  extraReducers: {
    //extrareducers
    [fetchFilteredGames.pending]: (state, { payload }) => {
      //if fetchFilteredGames is pending
      return { ...state, loading: true }; //set loading to true
    },
    [fetchFilteredGames.fulfilled]: (state, { payload }) => {
      //if fetchFilteredGames is fulfilled
      return {
        ...state, //return state
        filtered: [...state.filtered, payload], //add payload to filtered
        loading: false, //set loading to false
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeFilteredGames } = filterSlicer.actions; //export action creators
export default filterSlicer.reducer; //export reducer
