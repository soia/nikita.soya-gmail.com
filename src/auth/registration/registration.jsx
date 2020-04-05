import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

class Registration extends Component {
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

    registrationSubmit = event => {
        event.preventDefault();
        console.log('RegistrationSubmit');
    };

    render() {
        const styles = StyleSheet.create({
            container: {
                fontFamily: 'monserrat400',
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            },
        });
        return (
            <View style={styles.container}>
                <Text>Registration</Text>
                <Link to="/" underlayColor="#f0f4f7">
                    <Text>Login</Text>
                </Link>
            </View>
        );
    }
}

export default Registration;
