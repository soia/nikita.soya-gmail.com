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
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';

import Field from '../../UI/Field';
import compose from '../../utils/compose';
import { registartionPath } from '../../constants/pathLocation';
import withTranslation from '../../hoc/i18n-hoc';

class Login extends Component {
    state = {
        email: '',
        password: '',
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
        isKeyboardOpen: false,
    };

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.keyboardDidHide,
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardDidShow = () => {
        this.setState({
            isKeyboardOpen: true,
        });
    };

    keyboardDidHide = () => {
        this.setState({
            isKeyboardOpen: false,
        });
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
                        emailCharactersError: i18n.t('error.only_letters_symbols_numbers'),
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
                            passwordLengthError: i18n.t('error.password_at_least_6_chars'),
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
                            passwordLettersError: i18n.t('error.password_at_least_1_letters'),
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
                        passwordCharactersError: i18n.t('error.only_latin_letters_and_numbers_allowed'),
                    },
                }));
            }
            // PASSWORD VALIDATION
        }
    };

    validateFields = () => {
        const { i18n } = this.props;
        const {
            email,
            password,
        } = this.state;

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
    }

    loginSubmit = async () => {
        await this.validateFields();
        const {
            email,
            password,
            passwordErrors,
            emailErrors,
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
            }
        }
    };

    render() {
        const { i18n } = this.props;
        const {
            email, password, isKeyboardOpen, emailErrors, passwordErrors,
        } = this.state;
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                paddingHorizontal: 25,
                paddingVertical: 25,
            },

            content: {
                flex: 1,
                justifyContent: 'flex-end',
            },

            logoWrapper: {
                position: 'absolute',
                top: 100,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                flex: isKeyboardOpen ? 0 : 1,
            },

            inputWrapperStyle: {
                marginTop: 22,
            },

            forgotPassword: {
                fontFamily: 'monserratRegular',
                fontSize: 12,
                textDecorationLine: 'underline',
                color: '#ABB8C8',
                marginTop: 11,
            },

            forgotPasswordLink: {
                marginBottom: 40,
                alignSelf: 'flex-end',
            },

            buttonWrapper: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 36,
                marginBottom: 20,
            },

            linearGradient: {
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                width: 170,
                height: 46,
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowRadius: 10,
            },

            buttonText: {
                fontFamily: 'monserratRegular',
                fontSize: 16,
                textTransform: 'uppercase',
                color: '#fff',
            },

            bottomWrapper: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 16,
                marginBottom: 20,
            },

            dontHaveAnAccount: {
                fontFamily: 'monserratRegular',
                fontSize: 14,
                color: '#ABB8C8',
                marginRight: 4,
            },

            signUp: {
                fontFamily: 'monserratRegular',
                fontSize: 14,
                color: '#ABB8C8',
                textDecorationLine: 'underline',
            },
        });

        return (
            <LinearGradient
                colors={['#203752', '#204362']}
                start={{ x: 0.95, y: -0.14 }}
                end={{ x: 0.95, y: 0.68 }}
                locations={[0.2, 1]}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <View style={styles.logoWrapper}>
                            <SvgUri
                                width="215"
                                height="215"
                                source={require('../../../assets/logo-with-label.svg')}
                            />
                        </View>
                        <View style={styles.content}>
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
                                <View style={styles.inputLine} />
                                <Link to={registartionPath} style={styles.forgotPasswordLink}>
                                    <Text style={styles.forgotPassword}>
                                        {i18n.t('auth.forgotPassword')}
                                    </Text>
                                </Link>
                                <TouchableOpacity activeOpacity={0.7} onPress={this.loginSubmit} style={styles.buttonWrapper}>
                                    <LinearGradient
                                        start={[0, 0]}
                                        end={[1, 1]}
                                        locations={[0.0, 0.99]}
                                        colors={['#191C2D', '#2B73A5']}
                                        style={styles.linearGradient}
                                    >
                                        <Text style={styles.buttonText}>
                                            {i18n.t('auth.signIn')}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <View style={styles.bottomWrapper}>
                                    <Text style={styles.dontHaveAnAccount}>
                                        {i18n.t('auth.dontHaveAnAccount')}
                                    </Text>
                                    <Link to={registartionPath}>
                                        <Text style={styles.signUp}>{i18n.t('auth.signUp')}</Text>
                                    </Link>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </LinearGradient>
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
