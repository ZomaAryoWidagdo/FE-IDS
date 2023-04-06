import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import dataReducers from "./dataReducer";

export const store = configureStore(
  {
    reducer: {
      data: dataReducers,
    },
  },
  applyMiddleware(thunk)
);
