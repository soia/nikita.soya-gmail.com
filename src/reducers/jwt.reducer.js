import { handleActions, createAction } from 'redux-actions';

const SET_STATUS = 'REFRESH/SET_STATUS';
const RESET_STATUS = 'REFRESH/RESET_STATUS';

const REDUCER_NAME = 'refresh';

export const setStatus = createAction(SET_STATUS);
export const resetStatus = createAction(RESET_STATUS);

const initialState = {
    status: '',
};

export default handleActions(
    {
        [setStatus]: (state, { payload }) => ({ ...state, status: payload }),
        [resetStatus]: state => ({ ...state, status: false }),
    },
    initialState,
);

export const statusSelector = state => state[REDUCER_NAME].status;
