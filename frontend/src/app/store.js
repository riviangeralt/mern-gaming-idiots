import { configureStore } from "@reduxjs/toolkit";
import gamesSlicer from "../slices/gamesSlice";
import popupSlicer from "../slices/popupSlice";
import filterSlicer from "../slices/filterSlicer";
import userSlicer from "../slices/userSlice";

export default configureStore({
  reducer: {
    games: gamesSlicer,
    popup: popupSlicer,
    filteredGame: filterSlicer,
    users: userSlicer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
