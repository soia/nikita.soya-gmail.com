import React from 'react';
import { Provider } from 'react-redux';

import DeleteService from './src/services/delete-service';
import GetService from './src/services/get-service';
import PostService from './src/services/post-service';
import PatchService from './src/services/patch-service';
import { DeleteServiceProvider } from './src/context/delete-service-context';
import { GetServiceProvider } from './src/context/get-service-context';
import { PostServiceProvider } from './src/context/post-service-context';
import { PatchServiceProvider } from './src/context/patch-service-context';
import store from './src/store';

// import './src/i18n';
import Wallet from './src';


const deleteService = new DeleteService();

const getService = new GetService();

const postService = new PostService();

const patchService = new PatchService();

const App = () => (
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

export default App;
