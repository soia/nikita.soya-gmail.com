/* eslint-disable global-require */
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ImageBackground,
} from 'react-native';
import SvgUri from 'expo-svg-uri';
import { Link } from 'react-router-native';
import { registartionPath } from '../../constants/pathLocation';
import backgroundImage from '../images/background.jpg';

class Login extends Component {
    // state = {
    //     username: '',
    //     password: '',
    //     errors: {
    //         usernameError: '',
    //         passwordError: '',
    //     },
    // };

    inputOnchange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    loginSubmit = event => {
        event.preventDefault();
        console.log('LoginSubmit');
    };

    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },

            background: {
                resizeMode: 'cover',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                flex: 1,
            },

            title: {
                fontSize: 34,
                alignItems: 'center',
                color: '#B2947B',
            },
        });

        return (
            <View style={styles.container}>
                <ImageBackground source={backgroundImage} style={styles.background} />
                <Text style={styles.title}>WALLET</Text>
                <Link to={registartionPath} underlayColor="#f0f4f7">
                    <Text>Registration</Text>
                </Link>
                <View>
                    <SvgUri
                        width="200"
                        height="200"
                        source={require('../../../assets/qqq.svg')}
                    />
                </View>
            </View>
        );
    }
}

export default Login;
