/* eslint-disable */
import { authModalConstants } from '../constants';

export function authModal(state, action) {
    if (state === undefined) {
        return {
            visibleLogin: false,
            login: false,
            signUp: false,
            resetPassword: false,
        };
    }
    switch (action.type) {
        case authModalConstants.OPEN_LOGIN:
            return {
                visibleLogin: true,
                login: true,
                signUp: false,
                resetPassword: false,
            };

        case authModalConstants.OPEN_SIGNUP:
            return {
                visibleLogin: true,
                login: false,
                signUp: true,
                resetPassword: false,
            };

            case authModalConstants.OPEN_RESET_PASSWORD:
            return {
                visibleLogin: true,
                login: false,
                signUp: false,
                resetPassword: true,
            };

        case authModalConstants.CLOSE_AUTH_MODAL:
            return {
                visibleLogin: false,
                login: false,
                signUp: false,
                resetPassword: false,
            };

        default:
            return state;
    }
}
