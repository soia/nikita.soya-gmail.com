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
import { registartionPath, passwordRestorePath } from './constants/pathLocation';
import LocalizationActions from './actions/localization.action';

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
                <Route path={registartionPath} component={Registration} />
                <Route path={passwordRestorePath} component={PasswordRestore} />
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
