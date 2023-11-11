import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";

const middleware = [...getDefaultMiddleware(), thunk];
const initialState = {
  blogs: [],
  notification: null,
  user: null,
};

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
  },
  preloadedState: initialState,
  middleware,
});

export default store;
