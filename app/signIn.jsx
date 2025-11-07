import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import BackButton from "../components/BackButton";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import { useRouter } from "expo-router";
import Input from "../components/Input";
import Icon from "../assets/icons/index";
import { useState } from "react";
import Button from "../components/Button";
import { supabase } from "../lib/supabase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Sign In", "Please fill in all fields!");
      return;
    }

    let trimmedEmail = email.trim();
    let trimmedPassword = password.trim();

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password: trimmedPassword,
    });

    setIsLoading(false);

    if (error) {
      Alert.alert("Sign In", error.message);
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.6), color: theme.colors.text }}>
            Please sign in to continue
          </Text>

          <Input
            icon={
              <Icon
                name="mail"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.text}
              />
            }
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
          />

          <Input
            icon={
              <Icon
                name="lock"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.text}
              />
            }
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />

          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          {/* Button */}
          <Button title="Sign In" loading={isLoading} onPress={onSubmit} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Pressable onPress={() => router.push("signUp")}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.semibold,
                },
              ]}
            >
              Sign up
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    gap: 45,
  },
  welcomeText: {
    fontSize: hp(4),
    color: theme.colors.text,
    fontWeight: theme.fonts.bold,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: "right",
    color: theme.colors.text,
    fontWeight: theme.fonts.semibold,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    fontSize: hp(1.6),
    color: theme.colors.text,
  },
});
