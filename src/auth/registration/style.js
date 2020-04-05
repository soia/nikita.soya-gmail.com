import {
    StyleSheet,
    Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 25,
        paddingVertical: 25,
        paddingTop: 60,
    },

    logoWrapper: {
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height / 10,
    },

    inputWrapperStyle: {
        marginTop: 22,
    },

    buttonWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        marginBottom: 20,
    },

    buttonText: {
        fontFamily: 'monserrat400',
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
    },

    bottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 26,
        marginBottom: 20,
    },

    dontHaveAnAccount: {
        fontFamily: 'monserrat400',
        fontSize: 14,
        color: '#ABB8C8',
        marginRight: 4,
    },

    signUp: {
        fontFamily: 'monserrat400',
        fontSize: 14,
        color: '#ABB8C8',
        textDecorationLine: 'underline',
    },

    checkboxCoitainer: {
        marginTop: 10,
        marginBottom: 50,
    },

    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'monserrat400',
        fontSize: 12,
        color: '#ABB8C8',
    },

    checkbox: {
        marginRight: 8,
    },

    checkboxLink: {
        textDecorationLine: 'underline',
        fontFamily: 'monserrat400',
        fontSize: 12,
        color: '#ABB8C8',
    },

    checkboxText: {
        fontFamily: 'monserrat400',
        fontSize: 12,
        color: '#ABB8C8',
    },

    checkboxError: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    invalidText: {
        fontFamily: 'monserrat400',
        fontSize: 10,
        color: '#EB5757',
        marginLeft: 4,
    },
});

export default styles;
