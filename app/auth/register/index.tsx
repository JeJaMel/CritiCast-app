import { KeyboardAvoidingView, useWindowDimensions, View, Text, ScrollView, Alert } from 'react-native'
import { ThemedText } from '@/presentation/theme/components/themed-text'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';

const RegisterScreen = () => {

    const { height } = useWindowDimensions();
    const backgroundColor = useThemeColor({}, 'background')

    const { signUp } = useAuthStore();

    const [isPosting, setIsPosting] = useState(false)
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    })

    const onSignUp = async () => {

        const { email, password, username } = form

        if (email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0) {
            Alert.alert('Validation', 'Mail, password or username are required.');
            return;
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Validation', 'Submit a valid mail.');
            return;
        }

        if (password.length < 5) {
            Alert.alert('Validation', 'Password must be at least 5 digits.');
            return;
        }

        if (username.length < 2) {
            Alert.alert('Validation', 'Username must be at least 3 digits.');
            return;
        }

        setIsPosting(true)
        const wasSuccesful = await signUp(email, password, username)
        setIsPosting(false)

        if (wasSuccesful) {
            router.replace('/(app)/home')
            return;
        }

        Alert.alert('Error', 'Incorrect user or password')

    }

    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={{ flex: 1 }}
        >
            <ScrollView
                style={{
                    paddingHorizontal: 40,
                    backgroundColor: backgroundColor,
                }}
            >
                <View style={{
                    paddingTop: height * 0.35
                }} >
                    <Text className='font-kanit-bold text-4xl text-center leading-[32px] text-[#ECEDEE] ' >Create Account</Text>


                    <ThemedText style={{ color: 'grey', marginTop: 15 }} >Please create an account to continue </ThemedText>
                </View>

                <View style={{ marginTop: 20 }} >

                    <ThemedTextInput
                        placeholder='Username'
                        autoCapitalize='none'
                        icon='person-outline'
                        value={form.username}
                        onChangeText={(value) => setForm({ ...form, username: value })}
                    />

                    <ThemedTextInput
                        placeholder='Email'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        icon='mail-outline'
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />

                    <ThemedTextInput
                        placeholder='Password'
                        autoCapitalize='none'
                        secureTextEntry
                        icon='lock-closed-outline'
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />

                </View>

                <View style={{ marginTop: 10 }} />

                <ThemedButton
                    icon='arrow-forward-circle-outline'
                    Buttonclassname="bg-primary border border-primary rounded-[5px] px-2.5 py-3.5 flex-row items-center justify-center"
                    textClassname="text-white font-bold text-center"
                    onPress={onSignUp}
                    disabled={isPosting}
                >Create account
                </ThemedButton>


                <View style={{ marginTop: 50 }} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <ThemedText>already have an account?</ThemedText>
                    <ThemedLink href="/auth/login" style={{ marginHorizontal: 5 }}>
                        Log in
                    </ThemedLink>
                </View>


            </ScrollView>
        </ KeyboardAvoidingView >
    )
}

export default RegisterScreen