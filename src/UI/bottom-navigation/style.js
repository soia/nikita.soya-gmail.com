import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 10,
        marginBottom: 5,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    tabOpacity: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
        padding: 10,
    },

    textStyle: {
        fontFamily: 'monserrat400',
        fontSize: 10,
        marginTop: 8,
        color: '#203E5C',
    },
});

export default style;
