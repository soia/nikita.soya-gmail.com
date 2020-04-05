/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SvgUri from 'expo-svg-uri';
import { Link } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';
import CheckBox from 'react-native-check-box';
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
import withTranslation from '../../hoc/i18n-hoc';

class Registration extends Component {
    state = {
        user: {
            email: '',
            password: '',
            confirmPassword: '',
            checkbox: false,
        },
        emailErrors: {
            emailLengthError: '',
            emailCharactersError: '',
        },
        passwordErrors: {
            passwordCharactersError: '',
            passwordLengthError: '',
            passwordDigitError: '',
            passwordUpperCaseLetter: '',
            passwordLettersError: '',
        },
        confirmPasswordErrors: {
            confirmPasswordCharactersError: '',
            confirmPasswordLengthError: '',
        },
        checkBoxErrors: {},
        loading: false,
    };

    inputOnchange = (name, value) => {
        const { i18n } = this.props;
        const {
            user: { password, confirmPassword },
        } = this.state;
        const numbersLatinLettersSymbols = /[A-Za-z0-9!@#,./$%^&*/':+{}=();" `/\-/\]/\\()/[_]+$/;
        const numbersLatinLetters = /[A-Za-z0-9]+$/;

        // EMAIL VALIDATION
        if (name === 'email') {
            if (value === '' || numbersLatinLettersSymbols.test(value)) {
                this.setState(state => ({
                    user: {
                        ...state.user,
                        [name]: value,
                    },
                    emailErrors: {
                        ...state.emailErrors,
                        emailCharactersError: '',
                    },
                }));

                // min length
                if (value.length > 0) {
                    this.setState(state => ({
                        user: {
                            ...state.user,
                            [name]: value,
                        },
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
                        user: {
                            ...state.user,
                            [name]: value,
                        },
                        emailErrors: {
                            ...state.emailErrors,
                            wrongEmail: i18n.t('error.wrong_email'),
                        },
                    }));
                } else {
                    this.setState(state => ({
                        user: {
                            ...state.user,
                            [name]: value,
                        },
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
                    user: {
                        ...state.user,
                        [name]: value,
                    },
                    passwordErrors: {
                        ...state.passwordErrors,
                        passwordCharactersError: '',
                    },
                }));

                // min length 6 chars
                if (value.length < 6) {
                    this.setState(state => ({
                        user: {
                            ...state.user,
                            [name]: value,
                        },
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordLengthError: i18n.t(
                                'error.password_at_least_6_chars',
                            ),
                        },
                    }));
                } else {
                    this.setState(state => ({
                        user: {
                            ...state.user,
                            [name]: value,
                        },
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
                        user: {
                            ...state.user,
                            [name]: value,
                        },
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordDigitError: i18n.t('error.password_at_least_1_digit'),
                        },
                    }));
                } else {
                    this.setState(state => ({
                        user: {
                            ...state.user,
                            [name]: value,
                        },
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordDigitError: '',
                        },
                    }));
                }
                // at least one digit

                // at least one letter to Upper Case
                if (!/^(?=.*[A-Z])/.test(value)) {
                    this.setState(state => ({
                        user: {
                            ...state.user,
                            [name]: value,
                        },
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordUpperCaseLetter: i18n.t(
                                'error.password_at_least_1_upperCase_letter',
                            ),
                        },
                    }));
                } else {
                    this.setState(state => ({
                        user: {
                            ...state.user,
                            [name]: value,
                        },
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordUpperCaseLetter: '',
                        },
                    }));
                }
                // at least one letter to Upper Case

                // at least one letters
                if (!/^(?=.*[a-z])/.test(value)) {
                    this.setState(state => ({
                        user: {
                            ...state.user,
                            [name]: value,
                        },
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordLettersError: i18n.t(
                                'error.password_at_least_1_letters',
                            ),
                        },
                    }));
                } else {
                    this.setState(state => ({
                        user: {
                            ...state.user,
                            [name]: value,
                        },
                        passwordErrors: {
                            ...state.passwordErrors,
                            passwordLettersError: '',
                        },
                    }));
                }
                // at least one letters

                // paswords doesn't match
                if (confirmPassword.length > 0 && confirmPassword !== value) {
                    this.setState(state => ({
                        confirmPasswordErrors: {
                            ...state.confirmPasswordErrors,
                            confirmPasswordDoesntMatch: 'Пароль не совпадает',
                        },
                    }));
                } else {
                    this.setState(state => ({
                        confirmPasswordErrors: {
                            ...state.confirmPasswordErrors,
                            confirmPasswordDoesntMatch: '',
                        },
                    }));
                }
                // paswords doesn't match
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
        // PASSWORD VALIDATION

        // CONFIRM PASSWORD VALIDATION
        if (name === 'confirmPassword') {
            // only numbers and letters
            if (value === '' || numbersLatinLetters.test(value)) {
                this.setState(state => ({
                    user: {
                        ...state.user,
                        [name]: value,
                    },
                    confirmPasswordErrors: {
                        ...state.confirmPasswordErrors,
                        confirmPasswordCharactersError: '',
                    },
                }));

                // min length
                if (value.length > 0) {
                    this.setState(state => ({
                        user: {
                            ...state.user,
                            [name]: value,
                        },
                        confirmPasswordErrors: {
                            ...state.confirmPasswordErrors,
                            confirmPasswordLengthError: '',
                        },
                    }));
                }
                // min length

                // paswords doesn't match
                if (value.length > 0 && password !== value) {
                    this.setState(state => ({
                        confirmPasswordErrors: {
                            ...state.confirmPasswordErrors,
                            confirmPasswordDoesntMatch: i18n.t(
                                'error.password_does_not_match',
                            ),
                        },
                    }));
                } else {
                    this.setState(state => ({
                        confirmPasswordErrors: {
                            ...state.confirmPasswordErrors,
                            confirmPasswordDoesntMatch: '',
                        },
                    }));
                }
                // paswords doesn't match
            } else {
                this.setState(state => ({
                    passwordErrors: {
                        ...state.passwordErrors,
                        confirmPasswordCharactersError: i18n.t(
                            'error.only_latin_letters_and_numbers_allowed',
                        ),
                    },
                }));
            }
            // PASSWORD VALIDATION
        }
        // CONFIRM PASSWORD VALIDATION
    };

    termOfUse = () => {
        const { user } = this.state;
        this.setState(
            state => ({
                user: {
                    ...user,
                    checkbox: !state.user.checkbox,
                },
            }),
            () => {
                const {
                    user: { checkbox },
                } = this.state;
                if (checkbox) {
                    this.setState({
                        checkBoxErrors: {},
                    });
                } else {
                    this.setState(state => ({
                        checkBoxErrors: {
                            ...state.checkBoxErrors,
                            isError: true,
                        },
                    }));
                }
            },
        );
    };

    validateFields = () => {
        const { i18n } = this.props;
        const {
            user: {
                email, password, confirmPassword, checkbox,
            },
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

        if (confirmPassword.length < 1) {
            this.setState(state => ({
                confirmPasswordErrors: {
                    ...state.confirmPasswordErrors,
                    confirmPasswordLengthError: i18n.t('error.field_can_not_be_empty'),
                },
            }));
        }

        if (!checkbox) {
            this.setState(state => ({
                checkBoxErrors: {
                    ...state.checkBoxErrors,
                    isError: true,
                },
            }));
        }
    };

    registrationSubmit = async event => {
        event.preventDefault();
        await this.validateFields();
        const {
            user: {
                email, password, confirmPassword, checkbox,
            },
            emailErrors,
            passwordErrors,
            confirmPasswordErrors,
            checkBoxErrors,
        } = this.state;
        const { user } = this.state;

        const copyEmailErrors = { ...emailErrors };
        const copyPasswordErrors = { ...passwordErrors };
        const copyConfirmPasswordErrors = { ...confirmPasswordErrors };

        Object.keys(copyEmailErrors).forEach(key => {
            if (!copyEmailErrors[key]) delete copyEmailErrors[key];
        });
        Object.keys(copyPasswordErrors).forEach(key => {
            if (!copyPasswordErrors[key]) delete copyPasswordErrors[key];
        });
        Object.keys(copyConfirmPasswordErrors).forEach(key => {
            if (!copyConfirmPasswordErrors[key]) delete copyConfirmPasswordErrors[key];
        });

        if (
            Object.keys(copyEmailErrors).length === 0
            && Object.keys(copyPasswordErrors).length === 0
            && Object.keys(copyConfirmPasswordErrors).length === 0
            && Object.keys(checkBoxErrors).length === 0
        ) {
            if (email && password && confirmPassword && checkbox) {
                console.log(user, 'SUCCESS REGISTRATION');
            }
        }
    };

    render() {
        const { i18n } = this.props;
        const {
            loading,
            emailErrors,
            passwordErrors,
            confirmPasswordErrors,
            user: {
                confirmPassword, email, password, checkbox,
            },
            checkBoxErrors: { isError },
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
                            <Field
                                inputWrapperStyle={styles.inputWrapperStyle}
                                onChangeText={value => this.inputOnchange('confirmPassword', value)}
                                value={confirmPassword}
                                textContentType="confirmPassword"
                                autoCapitalize="none"
                                placeholder={i18n.t('auth.confirmPassword')}
                                blurOnSubmit={false}
                                autoFocus={false}
                                autoCorrect={false}
                                returnKeyType="next"
                                error={confirmPasswordErrors}
                                labelText={i18n.t('auth.confirmPassword')}
                                secureTextEntry
                            />
                            <View>
                                <View style={styles.checkboxCoitainer}>
                                    <View style={styles.checkboxWrapper}>
                                        <CheckBox
                                            style={styles.checkbox}
                                            onClick={this.termOfUse}
                                            isChecked={checkbox}
                                            leftText="CheckBox"
                                            checkBoxColor="#ABB8C8"
                                        />
                                        <Text style={styles.checkboxText}>
                                            {i18n.t('auth.iAgree')}{' '}
                                        </Text>
                                        <Link to="/">
                                            <Text style={styles.checkboxLink}>
                                                {i18n.t('auth.termOfUse')}{' '}
                                            </Text>
                                        </Link>
                                        <Text style={styles.checkboxText}>
                                            {' '}
                                            {i18n.t('auth.and')}{' '}
                                        </Text>
                                        <Link to="/">
                                            <Text style={styles.checkboxLink}>
                                                {i18n.t('auth.privacyPolicy')}
                                            </Text>
                                        </Link>
                                    </View>
                                    {isError ? (
                                        <View style={styles.checkboxError}>
                                            <SvgUri
                                                width="20"
                                                height="20"
                                                source={require('../../../assets/exclamation.svg')}
                                            />
                                            <Text style={styles.invalidText}>
                                                {i18n.t('error.need_to_agree')}
                                            </Text>
                                        </View>
                                    ) : null}
                                </View>
                                <Button
                                    onPress={this.registrationSubmit}
                                    buttonText={i18n.t('auth.signUp')}
                                    buttonWrapperStyle={styles.buttonWrapper}
                                    buttonTextStyle={styles.buttonText}
                                    loading={loading}
                                />
                                <View style={styles.bottomWrapper}>
                                    <Text style={styles.dontHaveAnAccount}>
                                        {i18n.t('auth.haveAnAccount')}
                                    </Text>
                                    <Link to="/">
                                        <Text style={styles.signUp}>
                                            {i18n.t('auth.signIn')}
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

Registration.defaultProps = {
    i18n: {},
};

Registration.propTypes = {
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

export default compose(withTranslation, connect(mapStateToProps))(Registration);
