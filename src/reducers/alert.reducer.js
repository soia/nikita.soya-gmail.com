import { alertConstants } from '../constants';

function alert(state = {}, action) {
    switch (action.type) {
    case alertConstants.SUCCESS:
        return {
            type: 'alert-success',
            message: action.message,
            error: false,
        };
    case alertConstants.ERROR:
        return {
            type: 'alert-danger',
            message: action.message,
            error: true,
        };
    case alertConstants.CLEAR:
        return {};
    default:
        return state;
    }
}

export default alert;
