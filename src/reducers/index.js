import { combineReducers } from 'redux';
import alert from './alert.reducer';
import authentication from './authentication.reducer';
import refreshToken from './jwt.reducer';
import verifyRegistrationReducer from './verify-registration.reducer';
import { registration } from './registration.reducer';
import { authModal } from './authModal.reducer';

const rootReducer = combineReducers({
    authentication,
    alert,
    refreshToken,
    verifyRegistrationReducer,
    authModal,
    registration,
});

export default rootReducer;
