/* eslint-disable global-require */
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import DeleteService from './src/services/delete-service';
import GetService from './src/services/get-service';
import PostService from './src/services/post-service';
import PatchService from './src/services/patch-service';
import { DeleteServiceProvider } from './src/context/delete-service-context';
import { GetServiceProvider } from './src/context/get-service-context';
import { PostServiceProvider } from './src/context/post-service-context';
import { PatchServiceProvider } from './src/context/patch-service-context';
import store from './src/store';
import Wallet from './src';

const deleteService = new DeleteService();

const getService = new GetService();

const postService = new PostService();

const patchService = new PatchService();

const App = () => {
    const [fontloaded, setfontloaded] = useState(false);
    const fetchFonts = async () => {
        await Font.loadAsync({
            monserrat400: require('./assets/fonts/Montserrat-Regular.ttf'),
            monserrat500: require('./assets/fonts/Montserrat-Medium.ttf'),
        });
    };

    if (!fontloaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onError={err => console.log(err, 'Error in App.jsx')}
                onFinish={() => { setfontloaded(true); }}
            />
        );
    }

    return (
        <Provider store={store}>
            <DeleteServiceProvider value={deleteService}>
                <GetServiceProvider value={getService}>
                    <PostServiceProvider value={postService}>
                        <PatchServiceProvider value={patchService}>
                            <Wallet />
                        </PatchServiceProvider>
                    </PostServiceProvider>
                </GetServiceProvider>
            </DeleteServiceProvider>
        </Provider>
    );
};

export default App;
