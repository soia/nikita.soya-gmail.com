import moment from 'moment';
import { AsyncStorage } from 'react-native';
import refreshToken from '../services/refresh-token.service';

const userJson = AsyncStorage.getItem('user');

const getUpdateTokenTime = () => AsyncStorage.getItem('updateTokenTime');

const getExpiresTokenTime = () => (userJson ? getUpdateTokenTime() * 1000 + 20000 : 0);

const getCurrentTime = () => {
    const getTime = moment().unix();
    return getTime * 1000;
};

export function logMiddleware({ dispatch, getState }) {
    return next => action => {
        if (typeof action === 'function') {
            if (
                getState().authentication
                && getState().authentication.user
                && getState().authentication.user.data
                && getState().authentication.user.data.access_token
            ) {
                if (
                    userJson
                    && getUpdateTokenTime()
                    && moment(getCurrentTime()).isAfter(getExpiresTokenTime())
                ) {
                    if (!getState().refreshToken.status) {
                        return refreshToken(dispatch).then(() => next(action));
                    }
                    return getState().refreshToken.status.then(() => next(action));
                }
            }
        }
        return next(action);
    };
}
export default logMiddleware;
