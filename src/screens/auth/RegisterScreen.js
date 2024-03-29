// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

import React, {useState, createRef} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import Loader from '../../components/Loader';

import { cadastrar } from '../../../bin/scripts/auth/cadastro';


const RegisterScreen = (props) => {
    const [ userName, setUserName ] = useState('');
    const [ userEmail, setUserEmail ] = useState('');
    const [ userAge, setUserAge ] = useState('');
    const [ userAddress, setUserAddress ] = useState('');
    const [ userPassword, setUserPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ errortext, setErrortext ] = useState('');
    const [ isRegistrationSuccess, setIsRegistrationSuccess ] = useState(false);

    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const addressInputRef = createRef();
    const passwordInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
            alert('Please fill Name');
            return;
        }
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userAge) {
            alert('Please fill Age');
            return;
        }
        if (!userAddress) {
            alert('Please fill Address');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        setLoading(true);

        var dataToSend = {
            nome: userName,
            email: userEmail,
            senha: userPassword,
            dataNascimento: userAge,
        };
        setIsRegistrationSuccess(cadastrar(dataToSend));
    };

    if (isRegistrationSuccess) {
        return (
        <View
            style={{
            flex: 1,
            backgroundColor: '#307ecc',
            justifyContent: 'center',
            }}>
            <Image
            source={require('../../assets/success.png')}
            style={{
                height: 150,
                resizeMode: 'contain',
                alignSelf: 'center'
            }}
            />
            <Text style={styles.successTextStyle}>
            Registration Successful
            </Text>
            <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonTextStyle}>Login Now</Text>
            </TouchableOpacity>
        </View>
        );
    }
    return (
        <View style={{flex: 1, backgroundColor: '#7895B2'}}>
        <Loader loading={loading} />
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
            <Image
                source={require('../../assets/planneje.png')}
                style={{
                width: 200,
                height: 200,
                resizeMode: 'contain',
                margin: 30,
                }}
            />
            </View>
            <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
                <TextInput
                style={styles.inputStyle}
                onChangeText={(UserName) => setUserName(UserName)}
                underlineColorAndroid="#f000"
                placeholder="Insira seu nome completo"
                placeholderTextColor="#0000009a"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                    emailInputRef.current && emailInputRef.current.focus()
                }
                blurOnSubmit={false}
                />
            </View>
            <View style={styles.SectionStyle}>
                <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                underlineColorAndroid="#f000"
                placeholder="Insira seu email"
                placeholderTextColor="#0000009a"
                keyboardType="email-address"
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
                />
            </View>
            <View style={styles.SectionStyle}>
                <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
                }
                underlineColorAndroid="#f000"
                placeholder="Insira sua senha"
                placeholderTextColor="#0000009a"
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry={true}
                onSubmitEditing={() =>
                    ageInputRef.current &&
                    ageInputRef.current.focus()
                }
                blurOnSubmit={false}
                />
            </View>
            <View style={styles.SectionStyle}>
                <TextInput
                style={styles.inputStyle}
                onChangeText={(UserAge) => setUserAge(UserAge)}
                underlineColorAndroid="#f000"
                placeholder="Insira sua data de nascimento"
                placeholderTextColor="#0000009a"
                keyboardType="numeric"
                ref={ageInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                    addressInputRef.current &&
                    addressInputRef.current.focus()
                }
                blurOnSubmit={false}
                />
            </View>
            <View style={styles.SectionStyle}>
                <TextInput
                style={styles.inputStyle}
                onChangeText={(UserAddress) =>
                    setUserAddress(UserAddress)
                }
                underlineColorAndroid="#f000"
                placeholder="Insira seu endereço"
                placeholderTextColor="#0000009a"
                autoCapitalize="sentences"
                ref={addressInputRef}
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                />
            </View>
            {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                {errortext}
                </Text>
            ) : null}
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitButton}>
                <Text style={styles.buttonTextStyle}>CADASTRAR</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
        </View>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#C2601F',
        borderWidth: 0,
        color: '#FFFFFF',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: '0000000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#097075',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});
