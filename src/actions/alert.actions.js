/* eslint-disable */

import { alertConstants } from '../constants';

function alertActionsSuccess(message) {
    return { type: alertConstants.SUCCESS, message };
}

function alertActionsError(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}

export const alertActions = {
    alertActionsSuccess,
    error,
    clear,
};
