
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import getEnvVars from '../../environment';

export default class GetService {
    getResource = async url => {
        const user = AsyncStorage.getItem('user');
        const getToken = () => user.access_token;

        const response = await axios.get(
            `${getEnvVars.REACT_APP_API_URL_AUTH_SERVICE}${url}`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            },
        );

        if (response.status !== 200) {
            response.json().then(errorMessage => {
                console.log(errorMessage, 'errorMessage');
            });

            if (response.status === 401) {
                this.logout();
            }

            throw new Error(
                `Could not fetch ${getEnvVars.REACT_APP_API_URL_AUTH_SERVICE}${url},
                received ${response.status}`,
            );
        }
        return response.data;
    };

    logout = () => {
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('updateTokenTime');
        document.location.reload(true);
    };

    test = async () => {
        const res = await this.getResource('/bot-configs');
        return res;
    };

    verifyRegistration = async id => {
        const res = await this.getResource(`/registration/verify/${id}`);
        return res;
    };
}
