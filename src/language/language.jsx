
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    StyleSheet, View, AsyncStorage, Button,
} from 'react-native';
import compose from '../utils/compose';
import LocalizationActions from '../actions/localization.action';

const Language = ({ dispatch }) => {
    const setLanguage = async lang => {
        await AsyncStorage.setItem('locale', lang);
        dispatch(LocalizationActions(lang));
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },

    });
    return (
        <View style={styles.container}>
            <Button
                onPress={() => setLanguage('en')}
                title="EN"
                color="#000"
                accessibilityLabel="language"
            />

            <Button
                onPress={() => setLanguage('ru')}
                title="RU"
                color="#000"
                accessibilityLabel="language"
            />
        </View>
    );
};

Language.defaultProps = {
    dispatch: () => {},
};

Language.propTypes = {
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
    connect(mapStateToProps),
)(Language);
