/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';
import { withRouter } from 'react-router-dom';
import SvgUri from 'expo-svg-uri';
import {
    View, Text, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import styles from './style';
import BottomPopUp from '../../UI/Bottom-pop-up';
import Field from '../../UI/Field';
import Button from '../../UI/Button';
import compose from '../../utils/compose';
import { registartionPath, personalAreaPath, homePagePath } from '../../constants/pathLocation';
import withTranslation from '../../hoc/i18n-hoc';
import PostService from '../../services/post-service';
import { actionSheet } from '../../actions';
import getEnvVars from '../../../environment';

class EmailConformation extends Component {
    postService = new PostService();

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

    handleResponse = response => response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });

    emailConformationSubmit = async () => {
        await this.validateFields();
        const { i18n, dispatch, history } = this.props;

        const { code, codeErrors } = this.state;
        this.setState({
            loading: true,
        });

        const copyEmailErrors = { ...codeErrors };

        Object.keys(copyEmailErrors).forEach(key => {
            if (!copyEmailErrors[key]) delete copyEmailErrors[key];
        });

        if (Object.keys(copyEmailErrors).length === 0) {
            if (code) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                };

                fetch(
                    `${getEnvVars.REACT_APP_API_URL_AUTH_SERVICE}/registration/verify/${code}`,
                    requestOptions,
                )
                    .then(this.handleResponse)
                    .then(() => {
                        this.setState({
                            loading: false,
                        });

                        history.push(`${personalAreaPath}${homePagePath}`);
                    })
                    .catch(() => {
                        dispatch(
                            actionSheet.showPopUp(
                                true,
                                i18n.t('auth.codeNotFound'),
                                i18n.t('general.close'),
                            ),
                        );
                        this.setState({
                            loading: false,
                        });
                    });
            }
        }
    };

    render() {
        const { i18n } = this.props;
        const { code, loading, codeErrors } = this.state;

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
                    <BottomPopUp />
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }
}

EmailConformation.defaultProps = {
    i18n: {},
    history: {},
    dispatch: () => {},
};

EmailConformation.propTypes = {
    i18n: PropTypes.object,
    history: PropTypes.object,
    dispatch: PropTypes.func,
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
    withRouter,
)(EmailConformation);
