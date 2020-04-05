/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import store from '../store';
import { userConstants } from '../constants';
import getEnvVars from '../../environment';

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

const saveUserData = async data => {
    try {
        await AsyncStorage.setItem('user', data);
    } catch (error) {
        console.log(error, 'Cant save user data');
    }
};

const saveUpadateTokenTime = async time => {
    try {
        await AsyncStorage.setItem('updateTokenTime', time.toString());
    } catch (error) {
        console.log(error, 'Cant save updateTokenTime');
    }
};


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
        url: `${getEnvVars.REACT_APP_API_URL_AUTH_SERVICE}/oauth/token`,
    };

    return axios(options).then(user => {
        console.log(user, 'useruseruseruseruseruseruseruseruser');
        saveUserData(JSON.stringify(user.data));
        saveUpadateTokenTime(moment().unix());
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
        `${getEnvVars.REACT_APP_API_URL_AUTH_SERVICE}/registration`,
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
