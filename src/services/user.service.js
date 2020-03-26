/* eslint-disable import/prefer-default-export */
import * as moment from 'moment';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import store from '../store';
import { userConstants } from '../constants';

const logoutActions = () => {
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('updateTokenTime');
    return { type: userConstants.LOGOUT };
};

const logout = () => {
    store.dispatch(logoutActions());
};

if (AsyncStorage.getItem('user') === 'undefined') {
    logout();
}

const handleResponse = response => response.text()
    .then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });

const login = (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');

    const options = {
        method: 'POST',
        headers: {
            Authorization: 'Basic YnJvd3Nlcjpicm93c2Vy',
            'Access-Control-Allow-Origin': '*',
        },
        data: formData,
        url: `${process.env.REACT_APP_API_URL_AUTH_SERVICE}/oauth/token`,
    };

    return axios(options).then(user => {
        AsyncStorage.setItem('user', JSON.stringify(user.data));
        AsyncStorage.setItem('updateTokenTime', moment().unix());
        return user;
    });
};

const register = user => {
    const { password, email } = user;
    const data = {
        password,
        email,
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    return fetch(
        `${process.env.REACT_APP_API_URL_AUTH_SERVICE}/registration`,
        requestOptions,
    )
        .then(handleResponse)
        .then(item => item);
};

export const userService = {
    login,
    logout,
    register,
};
