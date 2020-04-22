import React from 'react';
import { Route } from 'react-router-native';
import { withRouter } from 'react-router-dom';
import compose from '../../../utils/compose';

import {
    personalAreaPath,
    homePagePath,
} from '../../../constants';

import HomePage from './home-page';

const PersonalAreaView = () => (
    <Route path={`${personalAreaPath}${homePagePath}`} component={HomePage} />
);

export default compose(
    withRouter,
)(PersonalAreaView);
