/* eslint-disable global-require */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import SvgUri from 'expo-svg-uri';
import {
    View, Text,
} from 'react-native';

import { actionSheet } from '../../actions';
import styles from './style';
import Button from '../Button';
import compose from '../../utils/compose';

const BottomPopUp = ({
    isVisibleActionSheet, isError, contentText, buttonText, closePopUp,
}) => {
    const textStyle = isError ? styles.errorText : styles.successText;

    return (
        <Modal
            isVisible={isVisibleActionSheet}
            onBackdropPress={() => closePopUp()}
            style={styles.bottomModal}
        >
            <View style={styles.modalContent}>
                {isError
                    ? (
                        <SvgUri
                            width="52"
                            height="52"
                            source={require('../../../assets/error.svg')}
                        />
                    )
                    : (
                        <SvgUri
                            width="52"
                            height="52"
                            source={require('../../../assets/done.svg')}
                        />
                    )}
                <Text style={textStyle}>{contentText}</Text>
                <Button
                    onPress={() => closePopUp()}
                    buttonText={buttonText}
                    buttonWrapperStyle={styles.buttonWrapper}
                    buttonTextStyle={styles.buttonText}
                />
            </View>
        </Modal>
    );
};

BottomPopUp.defaultProps = {
    closePopUp: () => {},
    isVisibleActionSheet: false,
    isError: false,
    contentText: '',
    buttonText: '',
};

BottomPopUp.propTypes = {
    closePopUp: PropTypes.func,
    isVisibleActionSheet: PropTypes.bool,
    isError: PropTypes.bool,
    contentText: PropTypes.string,
    buttonText: PropTypes.string,
};

const mapStateToProps = state => {
    const {
        actionSheet: {
            isVisibleActionSheet,
            isError,
            contentText,
            buttonText,
        },
    } = state;

    return {
        isVisibleActionSheet,
        isError,
        contentText,
        buttonText,
    };
};

const mapDispatchToProps = dispatch => ({
    closePopUp() {
        dispatch(actionSheet.hidePopUp());
    },
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(BottomPopUp);
