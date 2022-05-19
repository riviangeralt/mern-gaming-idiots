import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"; //import createSlice, createAsyncThunk, and current
import instance from "../api/apiData"; //import instance
import { isAuthenticated } from "../auth/Auth"; //import isAuthendicated
import instanceApi from "../api/backend";

export const fetchAsyncGames = createAsyncThunk(
  //create async thunk
  "game/fetchAsyncGames", //name of thunk
  async (page) => {
    //async thunk function
    const resp = await instance.get(
      //get games from api
      `/games?key=c542e67aec3a4340908f9de9e86038af&page=${page}`
    );
    return resp.data; //return games
  }
);

export const fetchIndividualGame = createAsyncThunk(
  "game/fetchIndividualGame",
  async (id) => {
    const resp = await instance.get(
      `/games/${id}?key=c542e67aec3a4340908f9de9e86038af`
    );
    return resp.data;
  }
);

export const fetchSearch = createAsyncThunk(
  "game/fetchSearch",
  async (data) => {
    const { term, page } = data;
    const resp = await instance.get(
      `/games?key=c542e67aec3a4340908f9de9e86038af&search=${term}&page=${page}`
    );
    return resp.data.results;
  }
);

export const fetchPlatforms = createAsyncThunk(
  "game/fetchPlatforms",
  async () => {
    const resp = await instance.get(
      `/platforms?key=c542e67aec3a4340908f9de9e86038af`
    );
    return resp.data.results;
  }
);

export const fetchNewReleased = createAsyncThunk(
  "game/fetchNewReleased",
  async (data) => {
    const { page, order } = data;
    //recent games past for last 30 days
    //recent games for last week
    //recent games future fornext week releasing game
    const resp = await instance.get(
      `/games/lists/recent-games-past?discover=true&ordering=-${
        //get recent games past for last 30 days
        order === "new" ? "added" : "rated" ? "rating" : null //if order is new, return added, if order is rated, return rating, if order is null, return null
      }&page=${page}&key=c542e67aec3a4340908f9de9e86038af`
    );
    return resp.data.results; //return recent games past for last 30 days
  }
);

export const getCartItems = createAsyncThunk("game/getCartItems", async () => {
  const userId = isAuthenticated() ? isAuthenticated().user._id : null;
  const resp = await instanceApi.get(`/cart/${userId}`);
  return resp.data;
});

export const deleteAllCartItems = createAsyncThunk(
  "game/deleteAllCartItems",
  async () => {
    const userId = isAuthenticated() ? isAuthenticated().user._id : null;
    const resp = await instanceApi.delete(`/cart/${userId}`);
    return resp.data;
  }
);

export const addCartItems = createAsyncThunk(
  "game/addCartItems",
  async (item) => {
    const userId = isAuthenticated() ? isAuthenticated().user._id : null;
    const resp = await instanceApi.post(`/cart/${userId}`, item);
    return resp.data;
  }
);

export const removeCartItems = createAsyncThunk(
  "game/removeCartItems",
  async (item) => {
    const userId = isAuthenticated() ? isAuthenticated().user._id : null;
    const resp = await instanceApi.delete(`/cart/${userId}/${item._id}`);
    return resp.data;
  }
);

const initialState = {
  //initial state
  allGames: [], //all games
  selectedGame: {}, //selected game
  loading: false, //loading
  currPage: 1, //current page
  cart: [], //cart
  platforms: {}, //platforms
  count: 0, //count
  newReleased: [], //new released
  message: "", //message
};

export const gamesSlice = createSlice({
  name: "games", //name of slice
  initialState, //initial state
  reducers: {
    //reducer
    removeSelectedGame: (state) => {
      //action to remove selected game from state and reset selected game to empty object
      return { ...state, selectedGame: {}, selectedPlatform: {} };
    },
    removeSearchedGame: (state) => {
      //action to remove searched game from state and reset searched game to empty array
      return { ...state, allGames: [] };
    },
    removeNewGames: (state) => {
      //action to remove new games from state and reset new games to empty array
      return { ...state, newReleased: [] };
    },
    setCurrentPage: (state, { payload }) => {
      //action to set current page to payload
      switch (
        payload.type //switch statement to set current page to payload
      ) {
        case "NEXT": //if payload is next
          return { ...state, currPage: state.currPage + 1 }; //set current page to current page + 1
        case "PREVIOUS": //if payload is previous
          state.currPage = state.currPage - 1; //set current page to current page - 1
          break; //break
        default:
          //if payload is not next or previous
          break; //break
      }
    },
  },
  extraReducers: {
    //extrareducers
    [fetchAsyncGames.pending]: (state) => {
      //if fetchAsyncGames is pending
      return { ...state, loading: true }; //return state with loading set to true
    },
    [fetchAsyncGames.fulfilled]: (state, action) => {
      //if fetchAsyncGames is fulfilled
      return {
        ...state,
        loading: false, //return state with loading set to false
        allGames: action.payload.results, //return state with allGames set to action payload results
        count: action.payload.count, //return state with count set to action payload count
      };
    },
    [fetchAsyncGames.rejected]: (err) => {
      //if fetchAsyncGames is rejected
      console.log("Rejected", err); //log rejected
    },
    [fetchIndividualGame.fulfilled]: (state, action) => {
      //if fetchIndividualGame is fulfilled
      return { ...state, selectedGame: action.payload }; //return state with selectedGame set to action payload
    },
    [fetchSearch.fulfilled]: (state, action) => {
      //if fetchSearch is fulfilled
      return { ...state, allGames: action.payload, currPage: 1 }; //return state with allGames set to action payload and currPage set to 1
    },
    [fetchPlatforms.fulfilled]: (state, action) => {
      //if fetchPlatforms is fulfilled
      return { ...state, platforms: action.payload }; //return state with platforms set to action payload
    },
    [fetchNewReleased.pending]: (state, action) => {
      //if fetchNewReleased is pending
      return { ...state, loading: true }; //return state with loading set to true
    },
    [fetchNewReleased.fulfilled]: (state, action) => {
      //if fetchNewReleased is fulfilled
      return {
        ...state,
        loading: false,
        newReleased: [...state.newReleased, action.payload], //return state with newReleased set to action payload
      };
    },
    [getCartItems.fulfilled]: (state, action) => {
      //if getCartItems is fulfilled
      return { ...state, cart: action.payload.cartItems }; //return state with cart set to action payload
    },
    [addCartItems.fulfilled]: (state, action) => {
      //if addCartItems is fulfilled
      return { ...state, cart: action.payload.cart }; //return state with cart set to action payload
    },
    [removeCartItems.fulfilled]: (state, action) => {
      //if removeCartItems is fulfilled
      return { ...state, cart: action.payload.cart }; //return state with cart set to action payload
    },
    [deleteAllCartItems.fulfilled]: (state, action) => {
      //if deleteAllCartItems is fulfilled
      return { ...state, cart: [] }; //return state with cart set to empty array
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  removeSelectedGame, //action to remove selected game from state and reset selected game to empty object
  setCurrentPage, //action to set current page to payload
  handleCart, //action to handle cart
  removeSearchedGame, //action to remove searched game from state and reset searched game to empty array
  removeNewGames, //action to remove new games from state and reset new games to empty array
} = gamesSlice.actions;
export const individualGame = (state) => state.games.selectedGame; //action to get individual game from state
export const cart = (state) => state.games.cart; //action to get cart from state
export default gamesSlice.reducer; //reducer
