import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import Login from './auth/login';
import Registration from './auth/registration/registration';
import { registartionPath } from './constants/pathLocation';

export default function Wallet() {
    return (
        <NativeRouter>
            <Route exact path="/" component={Login} />
            <Route path={registartionPath} component={Registration} />
        </NativeRouter>
    );
}
