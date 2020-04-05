/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import SvgUri from 'expo-svg-uri';
import {
    View, Text, TextInput, StyleSheet,
} from 'react-native';

const Field = ({
    error,
    onChangeText,
    labelText,
    textContentType,
    autoCapitalize,
    inputWrapperStyle,
    placeholder,
    blurOnSubmit,
    autoFocus,
    autoCorrect,
    returnKeyType,
    value,
    secureTextEntry,
}) => {
    const errorValues = Object.values(error).filter(item => item.length > 0);

    const style = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 25,
            paddingVertical: 25,
        },

        inputLine: {
            height: 1.3,
            backgroundColor: errorValues.length ? '#EB5757' : 'rgba(255, 255, 255, 0.6)',
            borderRadius: 6,
            marginBottom: 12,
        },

        labelStyle: {
            fontFamily: 'monserrat400',
            color: errorValues.length ? '#EB5757' : '#ABB8C8',
            marginBottom: 6,
            fontSize: 16,
            lineHeight: 18,
        },

        defaultInputStyle: {
            color: errorValues.length ? '#EB5757' : '#ABB8C8',
            height: 28,
            fontFamily: 'monserrat400',
            fontSize: 16,
            lineHeight: 18,
        },

        invalidWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
        },

        invalidText: {
            fontFamily: 'monserrat400',
            fontSize: 10,
            color: '#EB5757',
            marginLeft: 4,
        },
    });

    const placeholderTextColor = errorValues.length ? '#EB5757' : '#ABB8C8';

    return (
        <View style={inputWrapperStyle}>
            {value.length > 0
                ? (
                    <Text style={style.labelStyle}>
                        {labelText}
                    </Text>
                )
                : null}
            <View>
                <TextInput
                    style={style.defaultInputStyle}
                    onChangeText={onChangeText}
                    value={value}
                    textContentType={textContentType}
                    autoCapitalize={autoCapitalize}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    blurOnSubmit={blurOnSubmit}
                    autoFocus={autoFocus}
                    autoCorrect={autoCorrect}
                    returnKeyType={returnKeyType}
                    secureTextEntry={secureTextEntry}
                />
                <View style={style.inputLine} />
                {errorValues.length > 0 ? (
                    <View>
                        {errorValues.map((item, index) => (
                            <View key={`${index}${placeholder}`} style={style.invalidWrapper}>
                                <SvgUri
                                    width="20"
                                    height="20"
                                    source={require('../../../assets/exclamation.svg')}
                                />
                                <Text style={style.invalidText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                ) : null}
            </View>
        </View>
    );
};

Field.defaultProps = {
    error: {},
    inputWrapperStyle: {},
    labelText: '',
    placeholder: '',
    value: '',
    textContentType: '',
    autoCapitalize: '',
    returnKeyType: '',
    blurOnSubmit: false,
    autoFocus: false,
    autoCorrect: false,
    secureTextEntry: false,
    onChangeText: () => {},
};

Field.propTypes = {
    error: PropTypes.any,
    inputWrapperStyle: PropTypes.object,
    labelText: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    textContentType: PropTypes.string,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
    blurOnSubmit: PropTypes.bool,
    autoFocus: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    onChangeText: PropTypes.func,
};

export default Field;
