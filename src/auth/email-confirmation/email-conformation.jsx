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

class EmailConformation extends Component {
    state = {
        code: '',
        loading: false,
        codeErrors: {
            codeLengthError: '',
            codeCharactersError: '',
        },
    };

    inputOnchange = (name, value) => {
        this.setState({
            [name]: value.toLowerCase(),
        });

        // min length
        if (value.length > 0) {
            this.setState(state => ({
                [name]: value.toLowerCase(),
                codeErrors: {
                    ...state.codeErrors,
                    codeLengthError: '',
                },
            }));
        }
        // min length
    };

    validateFields = () => {
        const { i18n } = this.props;
        const { code } = this.state;

        if (code.length < 1) {
            this.setState(state => ({
                codeErrors: {
                    ...state.codeErrors,
                    codeLengthError: i18n.t('error.field_can_not_be_empty'),
                },
            }));
        }
    };

    emailConformationSubmit = async () => {
        await this.validateFields();
        const {
            code, codeErrors,
        } = this.state;

        const copyEmailErrors = { ...codeErrors };

        Object.keys(copyEmailErrors).forEach(key => {
            if (!copyEmailErrors[key]) delete copyEmailErrors[key];
        });

        if (
            Object.keys(copyEmailErrors).length === 0
        ) {
            if (code) {
                console.log('SUCCESSFUL EMAIL CONFIRMATION');
                this.setState({
                    loading: true,
                });
            }
        }
    };

    render() {
        const { i18n } = this.props;
        const {
            code, loading, codeErrors,
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
                            <Link to={registartionPath} style={styles.arrowBack}>
                                <SvgUri
                                    width="24"
                                    height="24"
                                    source={require('../../../assets/arrow-left.svg')}
                                />
                            </Link>
                            <Text style={styles.passwordRestoreTitle}>
                                {i18n.t('auth.emailConfirmations')}
                            </Text>
                        </View>
                        <Field
                            inputWrapperStyle={styles.inputWrapperStyle}
                            onChangeText={value => this.inputOnchange('code', value)}
                            value={code}
                            textContentType="oneTimeCode"
                            autoCapitalize="none"
                            placeholder={i18n.t('auth.emailCode')}
                            blurOnSubmit={false}
                            autoFocus={false}
                            autoCorrect={false}
                            returnKeyType="next"
                            error={codeErrors}
                            labelText={i18n.t('auth.emailCode')}
                        />
                    </View>
                    <Button
                        onPress={this.emailConformationSubmit}
                        buttonText={i18n.t('auth.confirm')}
                        buttonWrapperStyle={styles.buttonWrapper}
                        buttonTextStyle={styles.buttonText}
                        loading={loading}
                    />
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }
}

EmailConformation.defaultProps = {
    i18n: {},
};

EmailConformation.propTypes = {
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

export default compose(withTranslation, connect(mapStateToProps))(EmailConformation);
