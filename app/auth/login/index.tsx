import { KeyboardAvoidingView, useWindowDimensions, View, Text, ScrollView, Alert } from 'react-native'
import { ThemedText } from '@/presentation/theme/components/themed-text'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { useThemeColor } from '@/presentation/theme/hooks/use-theme-color';
import { useState } from 'react';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { router } from 'expo-router';

const LoginScreen = () => {

    const { login } = useAuthStore();

    const { height } = useWindowDimensions();
    const backgroundColor = useThemeColor({}, 'background')

    const [isPosting, setIsPosting] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const onLogin = async () => {

        const { email, password } = form

        if (email.trim().length === 0 || password.trim().length === 0) {
            Alert.alert('Validation', 'Mail and password are required.');
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

        setIsPosting(true)
        const wasSuccesful = await login(email, password)
        setIsPosting(false)

        if (wasSuccesful) {
            router.replace('/')
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
                    backgroundColor: backgroundColor
                }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{
                    paddingTop: height * 0.35
                }} >
                    <Text className='font-kanit-bold text-4xl text-center leading-[32px] text-[#ECEDEE] ' >Login </Text>
                    <ThemedText style={{ color: 'grey', marginTop: 1 }} >Please log in to continue</ThemedText>
                </View>

                <View style={{ marginTop: 10 }} >
                    <ThemedTextInput placeholder='Email' keyboardType='email-address' autoCapitalize='none' icon='mail-outline'
                        value={form.email} onChangeText={(value) => setForm({ ...form, email: value })} />
                    <ThemedTextInput placeholder='Password' autoCapitalize='none' secureTextEntry icon='lock-closed-outline'
                        value={form.password} onChangeText={(value) => setForm({ ...form, password: value })} />
                </View>

                <View style={{ marginTop: 10 }} />

                <ThemedButton
                    Buttonclassname="bg-primary border border-primary rounded-[5px] px-2.5 py-3.5 flex-row items-center justify-center"
                    textClassname="text-white font-bold text-center"
                    icon='arrow-forward-circle-outline'
                    onPress={onLogin}
                    disabled={isPosting}
                >Join
                </ThemedButton>

                {/* <ThemedButton Buttonclassname="bg-primary border border-primary rounded-lg px-4 py-3 flex-row items-center justify-between"
                    textClassname="text-white font-bold text-center" icon='arrow-forward-circle-outline' onPress={onLogin} disabled={isPosting} >Join</ThemedButton> */}

                <View style={{ marginTop: 50 }} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <ThemedText>dont have an account?</ThemedText>
                    <ThemedLink href="/auth/register" style={{ marginHorizontal: 5 }}>
                        Create Account
                    </ThemedLink>
                </View>


            </ScrollView>
        </ KeyboardAvoidingView >
    )
}

export default LoginScreen