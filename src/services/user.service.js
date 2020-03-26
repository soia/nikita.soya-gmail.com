/* eslint-disable import/no-cycle */
import * as moment from 'moment';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { setStatus, resetStatus } from '../reducers/jwt.reducer';
import { userActions } from '../actions';
import store from '../store';

function logout() {
    store.dispatch(userActions.logout());
}

const userJson = AsyncStorage.getItem('user');

const getToken = () => userJson && userJson.data && userJson.data.refresh_token;

if (AsyncStorage.getItem('user') === 'undefined') {
    logout();
}

function handleResponse(response) {
    return response.text().then(text => {
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
}

function login(username, password) {
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

    return axios(options)
        .then(user => {
            AsyncStorage.setItem('user', JSON.stringify(user.data));
            AsyncStorage.setItem('updateTokenTime', moment().unix());
            return user;
        });
}

function register(user) {
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

    return fetch(`${process.env.REACT_APP_API_URL_AUTH_SERVICE}/registration`, requestOptions)
        .then(handleResponse)
        .then(item => item);
}

function refreshToken(dispatch) {
    const formData = new FormData();
    formData.append('refresh_token', getToken());
    formData.append('grant_type', 'refresh_token');

    const options = {
        method: 'POST',
        headers: {
            Authorization: 'Basic YnJvd3Nlcjpicm93c2Vy',
            'Access-Control-Allow-Origin': '*',
        },
        data: formData,
        url: `${process.env.REACT_APP_API_URL_AUTH_SERVICE}/oauth/token`,
    };
    const response = axios(options);

    response
        .then(user => {
            dispatch(resetStatus());
            dispatch(userActions.success(user));
            AsyncStorage.setItem('user', JSON.stringify(user));
            AsyncStorage.setItem('updateTokenTime', moment().unix());

            return user.data.access_token
                ? Promise.resolve(dispatch(setStatus(null)))
                : Promise.reject(dispatch(setStatus(null)));
        })
        .catch(e => {
            console.log('error refreshing token', e);
            dispatch(resetStatus());
            return Promise.reject(e);
        });

    dispatch(setStatus(response));
    return response;
}

export const userService = {
    login,
    logout,
    register,
};

export default refreshToken;
