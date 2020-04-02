/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SvgUri from 'expo-svg-uri';
import { Link } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    View, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback,
} from 'react-native';

import compose from '../../utils/compose';
import { registartionPath } from '../../constants/pathLocation';
import withTranslation from '../../hoc/i18n-hoc';

class Login extends Component {
    state = {
        email: '',
        password: '',
        // errors: {
        //     emailError: '',
        //     passwordError: '',
        // },
    };

    inputOnchange = (name, value) => {
        this.setState({
            [name]: name === 'email' ? value.toLowerCase : value,
        });
    };

    loginSubmit = event => {
        event.preventDefault();
        console.log('LoginSubmit');
    };

    render() {
        const { i18n } = this.props;
        const { email, password } = this.state;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#203E5C',
                paddingHorizontal: 25,
                paddingVertical: 25,
            },

            logoWrapper: {
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
            },
            input: {
                height: 28,
                fontFamily: 'monserratRegular',
                fontSize: 16,
                lineHeight: 18,
                color: '#ABB8C8',
                marginTop: 22,
            },

            inputLine: {
                height: 1.3,
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: 6,
            },
        });

        return (

            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.logoWrapper}>
                        <SvgUri width="215" height="215" source={require('../../../assets/logo-with-label.svg')} />
                    </View>
                </TouchableWithoutFeedback>
                <TextInput
                    style={styles.input}
                    onChangeText={value => this.inputOnchange('email', value)}
                    value={email}
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor="#ABB8C8"
                />
                <View style={styles.inputLine} />
                <TextInput
                    style={styles.input}
                    onChangeText={value => this.inputOnchange('password', value)}
                    value={password}
                    textContentType="password"
                    secureTextEntry
                    autoCapitalize="none"
                    placeholder={i18n.t('auth.password')}
                    placeholderTextColor="#ABB8C8"
                />
                <View style={styles.inputLine} />
                <Link to={registartionPath} underlayColor="#f0f4f7">
                    <Text>Registration</Text>
                </Link>
                <Link to={registartionPath} underlayColor="#f0f4f7">
                    <Text>Registration</Text>
                </Link>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <LinearGradient
                        start={{ x: 0.95, y: -0.14 }}
                        end={{ x: 0.95, y: 0.68 }}
                        locations={[0.1, 0.4]}
                        colors={['#191C2D', '#2B73A5']}
                        style={{
                            padding: 15,
                            alignItems: 'center',
                            borderRadius: 20,
                            width: 170,
                        }}
                    >
                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontSize: 15,
                                color: '#fff',
                            }}
                        >
                        Sign in
                        </Text>
                    </LinearGradient>
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
