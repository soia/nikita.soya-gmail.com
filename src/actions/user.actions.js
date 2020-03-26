import { AsyncStorage } from 'react-native';
import {
    userConstants, tradePath, authModalConstants,
} from '../constants';
import { userService } from '../services/user.service';
import { authModalActions } from './authModal.actions';
import { alertActions } from '.';

function login(username, password, history) {
    function request(user) {
        return { type: userConstants.LOGIN_REQUEST, user };
    }
    function success(user) {
        return { type: userConstants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
        return { type: userConstants.LOGIN_FAILURE, error };
    }

    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password, history)
            .then(user => {
                dispatch(success(user.data));
                dispatch(alertActions.success('Authorization successful'));
                history.push(`${tradePath}`);
                dispatch(authModalActions.closeModal());
                console.log('Authorization successful');
            },
            error => {
                if (error.response) {
                    console.log(error.response.data.error_description);
                }
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            });
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

function register(user) {
    return dispatch => {
        dispatch(request());

        userService.register(user).then(
            user => {
                dispatch(success(user));
                dispatch(alertActions.success(authModalConstants.CHECK_EMAIL_FOR_FINISH_REGISTRATION));
            },
            error => {
                message.error(error, 2);
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
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
