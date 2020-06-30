import * as types from "../constants/ActionTypes";

export const addTask = (task) => ({
  type: types.ADD_TASK,
  product,
});

export const deleteTask = (id) => ({
  type: types.DELETE_TASK,
  id,
});
