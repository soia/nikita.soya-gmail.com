import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 25,
        paddingTop: 60,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },

    arrowBack: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    passwordRestoreTitle: {
        fontFamily: 'monserrat500',
        fontSize: 16,
        color: '#B2947B',
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
});

export default styles;
