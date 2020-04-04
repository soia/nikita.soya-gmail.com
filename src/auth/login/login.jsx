/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SvgUri from 'expo-svg-uri';
import { Link } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    View,
    Text,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import styles from './style';
import Field from '../../UI/Field';
import Button from '../../UI/Button';
import compose from '../../utils/compose';
import { registartionPath } from '../../constants/pathLocation';
import withTranslation from '../../hoc/i18n-hoc';

class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        emailErrors: {
            emailLengthError: '',
            emailCharactersError: '',
        },
        passwordErrors: {
            passwordCharactersError: '',
            passwordLengthError: '',
            passwordDigitError: '',
            passwordLettersError: '',
        },
    };

    inputOnchange = (name, value) => {
        const { i18n } = this.props;
        const numbersLatinLettersSymbols = /[A-Za-z0-9!@#,./$%^&*/':+{}=();" `/\-/\]/\\()/[_]+$/;
        const numbersLatinLetters = /[A-Za-z0-9]+$/;

        // EMAIL VALIDATION
        if (name === 'email') {
            if (value === '' || numbersLatinLettersSymbols.test(value)) {
                this.setState(state => ({
                    [name]: value.toLowerCase(),
                    emailErrors: {
                        ...state.emailErrors,
                        emailCharactersError: '',
                    },
                }));

                // min length
                if (value.length > 0) {
                    this.setState(state => ({
                        [name]: value.toLowerCase(),
                        emailErrors: {
                            ...state.emailErrors,
                            emailLengthError: '',
                        },
                    }));
                }
                // min length

                // email validation
                if (!/^\S+@\S+\.\S+$/.test(value.toLowerCase())) {
                    this.setState(state => ({
                        [name]: value.toLowerCase(),
                        emailErrors: {
                            ...state.emailErrors,
                            wrongEmail: i18n.t('error.wrong_email'),
                        },
                    }));
                } else {
                    this.setState(state => ({
                        [name]: value.toLowerCase(),
                        emailErrors: {
                            ...state.emailErrors,
                            wrongEmail: '',
                        },
                    }));
                }
                // email validation
            } else {
                this.setState(state => ({
                    emailErrors: {
                        ...state.emailErrors,
                        emailCharactersError: i18n.t(
                            'error.only_letters_symbols_numbers',
                        ),
                    },
                }));
            }
        }
        // EMAIL VALIDATION

        // PASSWORD VALIDATION
        if (name === 'password') {
            // only numbers and letters
            if (value === '' || numbersLatinLetters.test(value)) {
                this.setState(state => ({
                    [name]: value,
                    passwordErrors: {
                        ...state.passwordErrors,
                        passwordCharactersError: '',
                    },
                }));

                // min length 6 chars
                if (value.length < 6) {
                    this.setState(state => ({
                        [name]: value,
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordLengthError: i18n.t(
                                'error.password_at_least_6_chars',
                            ),
                        },
                    }));
                } else {
                    this.setState(state => ({
                        [name]: value,
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordLengthError: '',
                        },
                    }));
                }
                // min length 6 chars

                // at least one digit
                if (!/^(?=.*[0-9])/.test(value)) {
                    this.setState(state => ({
                        [name]: value,
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordDigitError: i18n.t('error.password_at_least_1_digit'),
                        },
                    }));
                } else {
                    this.setState(state => ({
                        [name]: value,
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordDigitError: '',
                        },
                    }));
                }
                // at least one digit

                // at least one letters
                if (!/^(?=.*[a-z])/.test(value.toLowerCase())) {
                    this.setState(state => ({
                        [name]: value,
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordLettersError: i18n.t(
                                'error.password_at_least_1_letters',
                            ),
                        },
                    }));
                } else {
                    this.setState(state => ({
                        [name]: value,
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordLettersError: '',
                        },
                    }));
                }
                // at least one letters
            } else {
                this.setState(state => ({
                    passwordErrors: {
                        ...state.passwordErrors,
                        passwordCharactersError: i18n.t(
                            'error.only_latin_letters_and_numbers_allowed',
                        ),
                    },
                }));
            }
            // PASSWORD VALIDATION
        }
    };

    validateFields = () => {
        const { i18n } = this.props;
        const { email, password } = this.state;

        if (email.length < 1) {
            this.setState(state => ({
                emailErrors: {
                    ...state.emailErrors,
                    emailLengthError: i18n.t('error.field_can_not_be_empty'),
                },
            }));
        }

        if (password.length < 1) {
            this.setState(state => ({
                passwordErrors: {
                    ...state.passwordErrors,
                    passwordLengthError: i18n.t('error.field_can_not_be_empty'),
                },
            }));
        }
    };

    loginSubmit = async () => {
        await this.validateFields();
        const {
            email, password, passwordErrors, emailErrors,
        } = this.state;

        const copyEmailErrors = { ...emailErrors };
        const copyPasswordErrors = { ...passwordErrors };

        Object.keys(copyEmailErrors).forEach(key => {
            if (!copyEmailErrors[key]) delete copyEmailErrors[key];
        });
        Object.keys(copyPasswordErrors).forEach(key => {
            if (!copyPasswordErrors[key]) delete copyPasswordErrors[key];
        });

        if (
            Object.keys(copyEmailErrors).length === 0
            && Object.keys(copyPasswordErrors).length === 0
        ) {
            if (email && password) {
                console.log('SUCCESSFUL LOGIN');
                this.setState({
                    loading: true,
                });
            }
        }
    };

    render() {
        const { i18n } = this.props;
        const {
            email, password, loading, emailErrors, passwordErrors,
        } = this.state;

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <LinearGradient
                        colors={['#203752', '#204362']}
                        start={{ x: 0.95, y: -0.14 }}
                        end={{ x: 0.95, y: 0.68 }}
                        locations={[0.2, 1]}
                        style={styles.container}
                    >
                        <View style={styles.logoWrapper}>
                            <SvgUri
                                width="215"
                                height="215"
                                source={require('../../../assets/logo-with-label.svg')}
                            />
                        </View>
                        <View>
                            <Field
                                inputWrapperStyle={styles.inputWrapperStyle}
                                onChangeText={value => this.inputOnchange('email', value)}
                                value={email}
                                textContentType="emailAddress"
                                autoCapitalize="none"
                                placeholder="Email"
                                blurOnSubmit={false}
                                autoFocus={false}
                                autoCorrect={false}
                                returnKeyType="next"
                                error={emailErrors}
                                labelText="Email"
                            />
                            <Field
                                inputWrapperStyle={styles.inputWrapperStyle}
                                onChangeText={value => this.inputOnchange('password', value)}
                                value={password}
                                textContentType="password"
                                autoCapitalize="none"
                                placeholder={i18n.t('auth.password')}
                                blurOnSubmit={false}
                                autoFocus={false}
                                autoCorrect={false}
                                returnKeyType="next"
                                error={passwordErrors}
                                labelText={i18n.t('auth.password')}
                                secureTextEntry
                            />
                            <View>
                                <Link
                                    to={registartionPath}
                                    style={styles.forgotPasswordLink}
                                >
                                    <Text style={styles.forgotPassword}>
                                        {i18n.t('auth.forgotPassword')}
                                    </Text>
                                </Link>
                                <Button
                                    onPress={this.loginSubmit}
                                    buttonText={i18n.t('auth.signIn')}
                                    buttonWrapperStyle={styles.buttonWrapper}
                                    buttonTextStyle={styles.buttonText}
                                    loading={loading}
                                />
                                <View style={styles.bottomWrapper}>
                                    <Text style={styles.dontHaveAnAccount}>
                                        {i18n.t('auth.dontHaveAnAccount')}
                                    </Text>
                                    <Link to={registartionPath}>
                                        <Text style={styles.signUp}>
                                            {i18n.t('auth.signUp')}
                                        </Text>
                                    </Link>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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

export default compose(withTranslation, connect(mapStateToProps))(Login);
