import { ADD_BOARD, CREATE_BOARD, DELETE_GAME } from "./type";
export const addBoard = (roomID, squares, status, player) => ({
  type: ADD_BOARD,
  payload: { roomID, squares, status, player},
});
export const createBoard = (roomID, size, player) => ({
  type: CREATE_BOARD,
  payload: { roomID, size, player },
});
export const deleteGame = (roomID) => ({
    type: DELETE_GAME,
    payload: roomID
})