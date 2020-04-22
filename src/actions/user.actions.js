/* eslint-disable  */
import { AsyncStorage } from 'react-native';
import {
    userConstants,
    tradePath,
    authModalConstants,
    emailConfirmationPath,
    personalAreaPath,
    homePagePath,
} from '../constants';
import { userService } from '../services/user.service';
import { authModalActions } from './authModal.actions';
import { actionSheet } from './action-sheet.action';
import { alertActions } from './alert.actions';
import i18n from 'i18n-js';
import { en, ru } from '../locales';

i18n.fallbacks = true;
i18n.translations = { en, ru };

function login(username, password, history) {
    function loginRequestActions(user) {
        return { type: userConstants.LOGIN_REQUEST, user };
    }
    function loginSuccessActions(user) {
        return { type: userConstants.LOGIN_SUCCESS, user };
    }
    function loginFailureActions(error) {
        return { type: userConstants.LOGIN_FAILURE, error };
    }

    return (dispatch) => {
        dispatch(loginRequestActions({ username }));

        userService.login(username, password, history).then(
            (user) => {
                dispatch(loginSuccessActions(user.data));
                dispatch(alertActions.alertActionsSuccess('Authorization successful'));
                history.push(`${personalAreaPath}${homePagePath}`);
                console.log('Authorization successful');
            },
            (error) => {
                if (error.response) {
                    console.log(error.response.data.error_description);
                }

                dispatch(
                    actionSheet.showPopUp(
                        true,
                        error.toString(),
                        i18n.t('general.close'),
                    ),
                );
                dispatch(loginFailureActions(error.toString()));
                dispatch(alertActions.alertActionsError(error.toString()));
            },
        );
    };
}

function success(user) {
    return {
        type: userConstants.LOGIN_SUCCESS,
        user,
    };
}

function logout() {
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('updateTokenTime');
    return { type: userConstants.LOGOUT };
}

function register(user, dispatch, history) {
    return (dispatch) => {
        dispatch(request());

        userService.register(user, history).then(
            (user) => {
                dispatch(success(user));
                dispatch(
                    alertActions.alertActionsSuccess(
                        authModalConstants.CHECK_EMAIL_FOR_FINISH_REGISTRATION,
                    ),
                );
                history.push(`${emailConfirmationPath}`);
                dispatch(
                    actionSheet.showPopUp(
                        false,
                        i18n.t('auth.checkActivationCode'),
                        'Ok',
                    ),
                );
            },
            (error) => {
                dispatch(
                    actionSheet.showPopUp(
                        true,
                        error.toString(),
                        i18n.t('general.close'),
                    ),
                );
                dispatch(failure(error.toString()));
                dispatch(alertActions.alertActionsError(error.toString()));
            },
        );
    };

    function request(user) {
        return {
            type: userConstants.REGISTER_REQUEST,
            user,
        };
    }

    function success(user) {
        return {
            type: userConstants.REGISTER_SUCCESS,
            user,
        };
    }

    function failure(error) {
        return {
            type: userConstants.REGISTER_FAILURE,
            error,
        };
    }
}

export const userActions = {
    login,
    logout,
    register,
    success,
};
