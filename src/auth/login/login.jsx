/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SvgUri from 'expo-svg-uri';
import { Link } from 'react-router-native';
import {
    View, Text, StyleSheet,
} from 'react-native';

import compose from '../../utils/compose';
import { registartionPath } from '../../constants/pathLocation';
import withTranslation from '../../hoc/i18n-hoc';


class Login extends Component {
    // state = {
    //     username: '',
    //     password: '',
    //     errors: {
    //         usernameError: '',
    //         passwordError: '',
    //     },
    // };

    inputOnchange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    loginSubmit = event => {
        event.preventDefault();
        console.log('LoginSubmit');
    };

    render() {
        const { i18n } = this.props;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#122d46',
                paddingHorizontal: 25,
            },
        });

        return (
            <View style={styles.container}>
                <SvgUri width="215" height="215" source={require('../../../assets/logo-with-label.svg')} />
                <Link to={registartionPath} underlayColor="#f0f4f7">
                    <Text>Registration</Text>
                </Link>
                <View style={styles.asfsdfdfg}>
                    <Text>
                        {i18n.t('foo')} {i18n.t('bar', { someValue: Date.now() })}
                    </Text>
                </View>
            </View>
        );
    }
}

Login.defaultProps = {
    i18n: {},
};

Login.propTypes = {
    i18n: PropTypes.object,
};

const mapStateToProps = state => {
    const {
        localization: { locale },
    } = state;

    return {
        locale,
    };
};

export default compose(
    withTranslation,
    connect(mapStateToProps),
)(Login);
