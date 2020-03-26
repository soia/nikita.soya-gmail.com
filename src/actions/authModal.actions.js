/* eslint-disable */

import { authModalConstants } from '../constants';

function openLogin() {
    return {
        type: authModalConstants.OPEN_LOGIN
    };
}

function openSignUp() {
    return {
        type: authModalConstants.OPEN_SIGNUP
    };
}

function openResetPassword() {
    return {
        type: authModalConstants.OPEN_RESET_PASSWORD
    };
}

function closeModal() {
    return {
        type: authModalConstants.CLOSE_AUTH_MODAL
    };
}

export const authModalActions = {
    openLogin,
    openSignUp,
    openResetPassword,
    closeModal
};
