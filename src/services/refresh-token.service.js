import { AsyncStorage } from 'react-native';
import axios from 'axios';
import * as moment from 'moment';
import { setStatus, resetStatus } from '../reducers/jwt.reducer';
import { userConstants } from '../constants';

const success = user => ({
    type: userConstants.REGISTER_SUCCESS,
    user,
});

const userJson = AsyncStorage.getItem('user');
const getToken = () => userJson && userJson.data && userJson.data.refresh_token;

const refreshToken = dispatch => {
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
            dispatch(success(user));
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
};

export default refreshToken;
