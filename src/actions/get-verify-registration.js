
import {
    verifyRegistration,
} from '../constants';

const verifyRegistrationRequested = () => ({
    type: verifyRegistration.FETCH_VERIFY_REGISTRATION_REQUEST,
});

const verifyRegistrationLoaded = data => ({
    type: verifyRegistration.FETCH_VERIFY_REGISTRATION_SUCCESS,
    payload: data,
});

const verifyRegistrationError = error => ({
    type: verifyRegistration.FETCH_VERIFY_REGISTRATION_FAILURE,
    payload: error,
});

const fetchVerifyRegistrationAction = getService => (id, history) => dispatch => {
    dispatch(verifyRegistrationRequested());
    getService
        .verifyRegistration(id)
        .then(data => {
            dispatch(verifyRegistrationLoaded(data));
            history.push('/');
        })
        .catch(err => {
            dispatch(verifyRegistrationError(err));
        });
};

export default fetchVerifyRegistrationAction;
