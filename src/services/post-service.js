import axios from 'axios';
import { AsyncStorage } from 'react-native';

export default class PostService {
    getResource = async (url, data) => {
        const user = AsyncStorage.getItem('user');
        const getToken = () => user.data.access_token;

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            data,
            url: `${process.env.REACT_APP_API_URL_PROVIDER}${url}`,
        };
        const response = await axios(options);

        if (response.status === 401) {
            this.logout();
        }

        if (response.status !== 200) {
            response.json().then(errorMessage => {
                console.log(errorMessage, 'errorMessage');
            });
        }

        if (!response.ok) {
            console.error(`Could not fetch ${url}, received ${response.status}`);
        }

        return response.data;
    };

    logout = () => {
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('updateTokenTime');
        document.location.reload(true);
    };

    test = async data => {
        const res = await this.getResource('/bot-configs/', data);
        return res;
    };
}
