import { combineReducers } from 'redux';
import alert from './alert.reducer';
import authentication from './authentication.reducer';
import refreshToken from './jwt.reducer';
import verifyRegistrationReducer from './verify-registration.reducer';
import { registration } from './registration.reducer';
import { authModal } from './authModal.reducer';
import localization from './localization.reducer';
import actionSheet from './action-sheet.reducer';

const rootReducer = combineReducers({
    authentication,
    alert,
    refreshToken,
    verifyRegistrationReducer,
    authModal,
    registration,
    localization,
    actionSheet,
});

export default rootReducer;
