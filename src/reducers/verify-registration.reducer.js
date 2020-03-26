import { verifyRegistration } from '../constants';

const verifyRegistrationReducer = (state, action) => {
    if (state === undefined) {
        return {
            verifyRegistration: {},
            loading: false,
            error: null,
            success: false,
        };
    }

    switch (action.type) {
    case verifyRegistration.FETCH_VERIFY_REGISTRATION_REQUEST:
        return {
            verifyRegistration: {},
            loading: true,
            error: null,
            success: false,
        };

    case verifyRegistration.FETCH_VERIFY_REGISTRATION_SUCCESS:
        return {
            verifyRegistration: action.payload,
            loading: false,
            error: null,
            success: true,
        };

    case verifyRegistration.FETCH_VERIFY_REGISTRATION_FAILURE:
        return {
            verifyRegistration: {},
            loading: false,
            error: action.payload,
            success: false,
        };

    default:
        return state;
    }
};

export default verifyRegistrationReducer;
