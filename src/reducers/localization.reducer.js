import localizationConstants from '../constants/localization.constants';

function localization(state = {}, action) {
    switch (action.type) {
    case localizationConstants.SET_LOCALE:
        return {
            locale: action.locale,
        };
    default:
        return state;
    }
}

export default localization;
