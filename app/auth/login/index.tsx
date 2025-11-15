import { KeyboardAvoidingView, useWindowDimensions, View, Text, ScrollView, Alert, Pressable, Animated, TextInput, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
    const { login } = useAuthStore();
    const { height } = useWindowDimensions();

    const [isPosting, setIsPosting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    const onLogin = async () => {
        const { email, password } = form;

        if (email.trim().length === 0 || password.trim().length === 0) {
            Alert.alert('Validation', 'Email and password are required.');
            return;
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Validation', 'Submit a valid email.');
            return;
        }

        if (password.length < 5) {
            Alert.alert('Validation', 'Password must be at least 5 characters.');
            return;
        }

        setIsPosting(true);
        const wasSuccessful = await login(email, password);
        setIsPosting(false);

        if (wasSuccessful) {
            router.replace('/(app)/home');
            return;
        }

        Alert.alert('Error', 'Incorrect email or password');
    };

    return (
        <KeyboardAvoidingView behavior='padding' className='flex-1 bg-[#0f1117]'>
            {/* Background Gradient */}
            <LinearGradient
                colors={['#1a1d29', '#0f1117', '#0f1117']}
                className='absolute inset-0'
            />

            <ScrollView
                className='flex-1 px-6'
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Animated.View
                    style={{
                        paddingTop: height * 0.15,
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}
                >
                    {/* Logo/Icon */}
                    <View className='items-center mb-8'>
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={{ width: 88, height: 88 }}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Title */}
                    <View className='mb-8'>
                        <Text className='text-white text-4xl font-bold text-center mb-2'>
                            Welcome Back
                        </Text>
                        <Text className='text-white/50 text-base text-center'>
                            Sign in to continue to CritiCast
                        </Text>
                    </View>

                    {/* Form */}
                    <View className='mb-6'>
                        {/* Email Input */}
                        <View className='mb-4'>
                            <Text className='text-white/60 text-sm font-semibold mb-2 ml-1'>Email</Text>
                            <View className='bg-[#1a1d29]/70 rounded-2xl border border-white/10 flex-row items-center px-4'>
                                <Ionicons name="mail-outline" size={20} color="#9ca3af" style={{ marginRight: 12 }} />
                                <TextInput
                                    value={form.email}
                                    onChangeText={(text) => setForm({ ...form, email: text })}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    className='flex-1 text-white text-base py-4'
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View className='mb-6'>
                            <Text className='text-white/60 text-sm font-semibold mb-2 ml-1'>Password</Text>
                            <View className='bg-[#1a1d29]/70 rounded-2xl border border-white/10 flex-row items-center px-4'>
                                <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" style={{ marginRight: 12 }} />
                                <TextInput
                                    value={form.password}
                                    onChangeText={(text) => setForm({ ...form, password: text })}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#94a3b8"
                                    secureTextEntry={!showPassword}
                                    className='flex-1 text-white text-base py-4'
                                />
                                <Pressable onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color="#9ca3af"
                                    />
                                </Pressable>
                            </View>
                        </View>

                        {/* Login Button */}
                        <Pressable
                            onPress={onLogin}
                            disabled={isPosting}
                            className='bg-blue-500 rounded-2xl py-4 flex-row items-center justify-center active:bg-blue-600'
                            style={{
                                opacity: isPosting ? 0.7 : 1,
                                shadowColor: '#3b82f6',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 8,
                                elevation: 6,
                            }}
                        >
                            {isPosting ? (
                                <View className='flex-row items-center'>
                                    <View className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2' />
                                    <Text className='text-white font-bold text-base'>Signing in...</Text>
                                </View>
                            ) : (
                                <>
                                    <Text className='text-white font-bold text-base mr-2'>Sign In</Text>
                                    <Ionicons name="arrow-forward-circle" size={24} color="#ffffff" />
                                </>
                            )}
                        </Pressable>
                    </View>

                    {/* Divider */}
                    <View className='flex-row items-center mb-6'>
                        <View className='flex-1 h-px bg-white/10' />
                        <Text className='text-white/40 text-sm mx-4'>or</Text>
                        <View className='flex-1 h-px bg-white/10' />
                    </View>

                    {/* Sign Up Link */}
                    <View className='flex-row items-center justify-center mb-12'>
                        <Text className='text-white/60 text-base'>Dont have an account? </Text>
                        <Pressable onPress={() => router.push('/auth/register')}>
                            <Text className='text-blue-400 font-bold text-base'>Sign Up</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;