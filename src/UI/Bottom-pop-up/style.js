import {
    StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    icon: {
        width: 52,
        height: 52,
    },

    errorText: {
        fontFamily: 'monserrat400',
        fontSize: 16,
        lineHeight: 18,
        color: '#EB5757',
        marginTop: 25,
    },

    successText: {
        fontFamily: 'monserrat400',
        fontSize: 16,
        lineHeight: 18,
        color: '#151719',
        marginTop: 25,
    },

    buttonWrapper: {
        marginTop: 25,
    },

    buttonText: {
        fontFamily: 'monserrat400',
        fontSize: 16,
        color: '#ffffff',
        textTransform: 'uppercase',
    },
});

export default styles;
