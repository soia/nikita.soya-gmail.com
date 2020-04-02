/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import i18n from 'i18n-js';
import { en, ru } from '../locales';

const withTranslation = Component => {
    i18n.fallbacks = true;
    i18n.translations = { en, ru };

    return props => <Component {...props} i18n={i18n} />;
};

export default withTranslation;
