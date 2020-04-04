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

    forgotPassword: {
        fontFamily: 'monserratRegular',
        fontSize: 12,
        textDecorationLine: 'underline',
        color: '#ABB8C8',
        marginTop: 11,
    },

    forgotPasswordLink: {
        marginBottom: 60,
        alignSelf: 'flex-end',
    },

    buttonWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        marginBottom: 20,
    },

    buttonText: {
        fontFamily: 'monserratRegular',
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

export default styles;
