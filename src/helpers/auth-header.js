import { AsyncStorage } from 'react-native';

function authHeader() {
    const user = AsyncStorage.getItem('user');
    const getToken = () => user && user.data && user.data.refresh_token;

    if (user && user.data.access_token) {
        return {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        };
    }
    return {
        'Content-Type': 'application/json',
    };
}

export default authHeader;
