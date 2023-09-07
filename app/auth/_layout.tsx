import { Stack } from "expo-router";

const AuthLayout = () => {
    return <Stack>
        <Stack.Screen name="SignIn" options={{ title: 'Sign In' }} />
        <Stack.Screen name="SignUp" options={{ title: "Sign Up", headerShown:false }} />
        <Stack.Screen name="SignOut" options={{ title: 'Sign Out' }} />
        <Stack.Screen name="Forget" options={{ title: 'Forget Password' }} />
        <Stack.Screen name="Reset" options={{ title: 'Reset' }} />
    </Stack>;
};
export default AuthLayout;