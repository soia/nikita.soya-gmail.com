/* eslint-disable import/prefer-default-export */
import localizationConstants from '../constants/localization.constants';

function LocalizationActions(locale) {
    return {
        type: localizationConstants.SET_LOCALE,
        locale,
    };
}

export default LocalizationActions;
