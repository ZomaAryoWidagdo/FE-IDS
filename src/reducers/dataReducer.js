import { GET_ALL_DATA, GET_DATA_BY_ID } from "../actions/actionTypes";

const initialState = {
  allData: [],
  dataDetails: {},
  error: "",
};

function dataReducers(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DATA:
      return { ...state, allData: action.payload };
    case GET_DATA_BY_ID:
      return { ...state, dataDetails: action.payload };
    default:
      return state;
  }
}

export default dataReducers;
