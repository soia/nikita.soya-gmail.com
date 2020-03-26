/* eslint-disable import/prefer-default-export */
import refreshTokenConstants from '../constants/refreshToken.constants';

function refreshToken() {
    return {
        type: refreshTokenConstants.SUCCESS,
    };
}

export const refreshTokenActions = {
    refreshToken,
};
