import { AsyncStorage } from 'react-native';
import { userConstants } from '../constants';

const user = AsyncStorage.getItem('user');
const initialState = user ? { loggedIn: true, loading: false, user } : {};

function authentication(state = initialState, action) {
    switch (action.type) {
    case userConstants.LOGIN_REQUEST:
        return {
            loggingIn: true,
            loading: true,
            user: action.user,
        };
    case userConstants.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            loading: false,
            user: action.user,
        };
    case userConstants.LOGIN_FAILURE:
        return {};
    case userConstants.LOGOUT:
        return {};
    default:
        return state;
    }
}

export default authentication;
