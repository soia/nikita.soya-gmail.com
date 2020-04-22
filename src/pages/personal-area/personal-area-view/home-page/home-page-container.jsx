/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
// import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';

import HomePageView from './home-page-view';
// import Spinner from '../../../../spinner';
// import ErrorIndicator from '../../../error-page/error-indicator';
import compose from '../../../../utils';

export class HomePage extends Component {
    state = {
        loading: false,
        error: false,
    };

    componentDidMount() {}

    onError = () => {
        this.setState({
            error: false,
            loading: false,
        });
    };

    render() {
        const { loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <Text>Error</Text> : null;
        const spinner = loading ? <Text>Spinner</Text> : null;
        const content = hasData ? <HomePageView /> : null;

        return (
            <KeyboardAvoidingView behavior="padding" enabled style={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {errorMessage}
                        {spinner}
                        {content}
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => {
    const { authentication } = state;

    return {
        authentication,
    };
};

// const mapDispatchToProps = (dispatch, { getService }) => bindActionCreators(
//     {
//         fetchUserInfo: fetchUserInfoAction(getService),
//         openSettingsTab: id => collapsePanelActions.selectCollapsePanel(id),
//     },
//     dispatch,
// );

export default compose(
    withTranslation(),
    connect(
        mapStateToProps,
        // mapDispatchToProps,
    ),
)(HomePage);
