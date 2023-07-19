import { configureStore } from "@reduxjs/toolkit";
import rootReuducer from "../reducer";

const store = configureStore({
  reducer: rootReuducer,
});

export default store;
