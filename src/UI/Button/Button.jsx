import React from 'react';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';

const Button = ({
    buttonTextStyle,
    onPress,
    buttonText,
    buttonWrapperStyle,
    loading,
}) => {
    const styles = StyleSheet.create({
        linearGradient: {
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
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
    });

    const linearGradientColors = loading
        ? ['#3C6E99', '#3C6E99']
        : ['#191C2D', '#2B73A5'];

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
            <View style={buttonWrapperStyle}>
                <LinearGradient
                    start={[0, 0]}
                    end={[1, 1]}
                    locations={[0.0, 0.99]}
                    colors={linearGradientColors}
                    style={styles.linearGradient}
                >
                    <View className={{ position: 'absolute', left: 10 }}>
                        {loading ? (
                            <ActivityIndicator animating size="small" color="#9DC3EF" />
                        ) : null}
                    </View>
                    <Text style={buttonTextStyle}>{buttonText}</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );
};

Button.defaultProps = {
    buttonTextStyle: {},
    buttonWrapperStyle: {},
    buttonText: '',
    loading: false,
    onPress: () => {},
};

Button.propTypes = {
    buttonTextStyle: PropTypes.object,
    buttonWrapperStyle: PropTypes.object,
    buttonText: PropTypes.string,
    loading: PropTypes.bool,
    onPress: PropTypes.func,
};

export default Button;
