import Constants from 'expo-constants';

const REACT_APP_API_URL_AUTH_SERVICE = 'http://bitcobit.profitserver.in.ua:8090/uaa';
const REACT_APP_API_URL_PROVIDER = 'http://bitcobit.profitserver.in.ua:8090/uaa';

const ENV = {
    dev: {
        REACT_APP_API_URL_AUTH_SERVICE,
        REACT_APP_API_URL_PROVIDER,
    },
    staging: {
        REACT_APP_API_URL_AUTH_SERVICE,
        REACT_APP_API_URL_PROVIDER,
    },
    prod: {
        REACT_APP_API_URL_AUTH_SERVICE,
        REACT_APP_API_URL_PROVIDER,
    },
};

function getEnvVars(env = '') {
    if (env === null || env === undefined || env === '') return ENV.dev;
    if (env.indexOf('dev') !== -1) return ENV.dev;
    if (env.indexOf('staging') !== -1) return ENV.staging;
    if (env.indexOf('prod') !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
