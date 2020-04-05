/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';
import SvgUri from 'expo-svg-uri';
import {
    View,
    Text,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

import styles from './style';
import Field from '../../UI/Field';
import Button from '../../UI/Button';
import compose from '../../utils/compose';
import { registartionPath } from '../../constants/pathLocation';
import withTranslation from '../../hoc/i18n-hoc';

class PasswordRestore extends Component {
    state = {
        email: '',
        loading: false,
        emailErrors: {
            emailLengthError: '',
            emailCharactersError: '',
        },
    };

    inputOnchange = (name, value) => {
        const { i18n } = this.props;
        const numbersLatinLettersSymbols = /[A-Za-z0-9!@#,./$%^&*/':+{}=();" `/\-/\]/\\()/[_]+$/;

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
    };

    validateFields = () => {
        const { i18n } = this.props;
        const { email } = this.state;

        if (email.length < 1) {
            this.setState(state => ({
                emailErrors: {
                    ...state.emailErrors,
                    emailLengthError: i18n.t('error.field_can_not_be_empty'),
                },
            }));
        }
    };

    passwordRestoreSubmit = async () => {
        await this.validateFields();
        const {
            email, emailErrors,
        } = this.state;

        const copyEmailErrors = { ...emailErrors };

        Object.keys(copyEmailErrors).forEach(key => {
            if (!copyEmailErrors[key]) delete copyEmailErrors[key];
        });

        if (
            Object.keys(copyEmailErrors).length === 0
        ) {
            if (email) {
                console.log('SUCCESSFUL PASSWORD RESTORE');
                this.setState({
                    loading: true,
                });
            }
        }
    };

    render() {
        const { i18n } = this.props;
        const {
            email, loading, emailErrors,
        } = this.state;

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <LinearGradient
                    colors={['#203752', '#204362']}
                    start={{ x: 0.95, y: -0.14 }}
                    end={{ x: 0.95, y: 0.68 }}
                    locations={[0.2, 1]}
                    style={styles.container}
                >
                    <View>
                        <View style={styles.header}>
                            <Link to="/" style={styles.arrowBack}>
                                <SvgUri
                                    width="24"
                                    height="24"
                                    source={require('../../../assets/arrow-left.svg')}
                                />
                            </Link>
                            <Text style={styles.passwordRestoreTitle}>
                                {i18n.t('auth.passwordRestore')}
                            </Text>
                        </View>
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
                    </View>
                    <View>
                        <Button
                            onPress={this.passwordRestoreSubmit}
                            buttonText={i18n.t('auth.restore')}
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
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }
}

PasswordRestore.defaultProps = {
    i18n: {},
};

PasswordRestore.propTypes = {
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

export default compose(withTranslation, connect(mapStateToProps))(PasswordRestore);
