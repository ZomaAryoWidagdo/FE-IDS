import { api } from "../api";
import { GET_ALL_DATA, GET_DATA_BY_ID } from "./actionTypes";

export const getAllData = () => async (dispatch) => {
  try {
    const { data } = await api.get(`/`);

    dispatch({
      type: GET_ALL_DATA,
      payload: data,
    });

    return "OK";
  } catch (err) {
    return "Failed to get Data";
  }
};

export const getDataDetails = (id) => async (dispatch) => {
  try {
    const { data } = await api.get(`/${id}`);

    dispatch({
      type: GET_DATA_BY_ID,
      payload: data,
    });

    return data;
  } catch (err) {
    return "Failed to get Data Details";
  }
};

export const postData = (payload) => async (dispatch) => {
  try {
    const { data } = await api.post(`/`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data === "Data Successfully Inserted") return "OK";
  } catch (err) {
    return "Failed to Add Data";
  }
};

export const editData = (payload, id) => async (dispatch) => {
  try {
    await api.patch(`/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return "OK";
  } catch (err) {
    return "Error Updating Data";
  }
};
