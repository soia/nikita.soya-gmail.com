import React, { Component } from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from 'i18n-js';

import compose from './utils/compose';
import Login from './auth/login';
import Registration from './auth/registration';
import PasswordRestore from './auth/password-restore';
import emailConformation from './auth/email-confirmation';
import twoFactorAuth from './auth/two-factor-auth';
import {
    registartionPath,
    passwordRestorePath,
    emailConfirmationPath,
    twoFAPath,
    personalAreaPath,
} from './constants';
import LocalizationActions from './actions/localization.action';
import PersonalArea from './pages/personal-area/personal-area';

class Wallet extends Component {
    componentDidMount() {
        this.getLang();
    }

    getLang = async () => {
        const { dispatch } = this.props;
        let locale = await AsyncStorage.getItem('locale');
        if (locale === null) {
            await AsyncStorage.setItem('locale', 'en');
            locale = 'en';
        }
        dispatch(LocalizationActions(locale));
    };

    render() {
        const { locale } = this.props;
        i18n.locale = locale;

        return (
            <NativeRouter>
                <Route exact path="/" component={Login} />
                <Route path={personalAreaPath} component={PersonalArea} />
                <Route path={registartionPath} component={Registration} />
                <Route path={emailConfirmationPath} component={emailConformation} />
                <Route path={passwordRestorePath} component={PasswordRestore} />
                <Route path={twoFAPath} component={twoFactorAuth} />
            </NativeRouter>
        );
    }
}

Wallet.defaultProps = {
    dispatch: () => {},
    locale: '',
};

Wallet.propTypes = {
    dispatch: PropTypes.func,
    locale: PropTypes.string,
};

const mapStateToProps = state => {
    const {
        localization: { locale },
    } = state;

    return {
        locale,
    };
};

export default compose(connect(mapStateToProps))(Wallet);
