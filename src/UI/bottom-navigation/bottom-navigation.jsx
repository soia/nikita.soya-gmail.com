/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SvgUri from 'expo-svg-uri';
import withTranslation from '../../hoc/i18n-hoc';
import compose from '../../utils';
import style from './style';
import { personalAreaPath, homePagePath } from '../../constants';

export class BottomNavigation extends Component {
    state = {
        activeTab: 1,
    };

    onPress = (label, path) => {
        const { history } = this.props;
        this.setState({
            activeTab: label,
        });
        history.push(path);
    };

    render() {
        const { activeTab } = this.state;
        const { i18n } = this.props;

        const tabData = [
            {
                id: 1,
                image: require('../../../assets/walletIcon.svg'),
                label: i18n.t('general.wallet'),
                path: `${personalAreaPath}${homePagePath}`,
            },
            {
                id: 2,
                image: require('../../../assets/buyIcon.svg'),
                label: i18n.t('general.buy'),
                path: `${personalAreaPath}${homePagePath}`,
            },
            {
                id: 3,
                image: require('../../../assets/sellIcon.svg'),
                label: i18n.t('general.sell'),
                path: `${personalAreaPath}${homePagePath}`,
            },
            {
                id: 4,
                image: require('../../../assets/exchange.svg'),
                label: i18n.t('general.exchange'),
                path: `${personalAreaPath}${homePagePath}`,
            },
            {
                id: 5,
                image: require('../../../assets/settings.svg'),
                label: i18n.t('general.settings'),
                path: `${personalAreaPath}${homePagePath}`,
            },
        ];

        return (
            <View style={style.container}>
                {tabData.map(item => {
                    const {
                        id, image, label, path,
                    } = item;
                    let tabStyle = {};
                    let iconStyle = {};
                    if (activeTab === id) {
                        tabStyle = style.tab;
                        iconStyle = { opacity: 1 };
                    } else {
                        tabStyle = style.tabOpacity;
                        iconStyle = { opacity: 0.6 };
                    }

                    return (
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => this.onPress(id, path)}
                            key={id}
                        >
                            <View style={tabStyle}>
                                <SvgUri width="25" height="25" source={image} style={iconStyle} />
                                <Text style={style.textStyle}>{label}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}

BottomNavigation.defaultProps = {
    i18n: {},
    history: {},
};

BottomNavigation.propTypes = {
    i18n: PropTypes.object,
    history: PropTypes.object,
};

const mapStateToProps = state => {
    const { authentication } = state;

    return {
        authentication,
    };
};

export default compose(
    withTranslation,
    connect(mapStateToProps),
    withRouter,
)(BottomNavigation);
