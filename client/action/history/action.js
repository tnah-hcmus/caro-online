import { ADD_BOARD, CREATE_BOARD, RESET_GAME } from "./type";
export const addBoard = (roomID, squares, status, player) => ({
  type: ADD_BOARD,
  payload: { roomID, squares, status, player, timestamp: Date.now()},
});
export const createBoard = (roomID, size) => ({
  type: CREATE_BOARD,
  payload: { roomID, size },
});
export const deleteGame = (roomID, size) => ({
    type: RESET_GAME,
    payload: {roomID, size}
})