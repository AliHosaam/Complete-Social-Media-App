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

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (!email || !password || !name) {
      Alert.alert("Sign Up", "Please fill in all fields!");
      return;
    }

    let trimmedName = name.trim();
    let trimmedEmail = email.trim();
    let trimmedPassword = password.trim();

    setIsLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: trimmedEmail,
      password: trimmedPassword,
      options: {
        data: {
          name: trimmedName,
        },
      },
    });
    setIsLoading(false);

    if (error) {
      Alert.alert("Sign Up", error.message);
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Let&apos;s</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.6), color: theme.colors.text }}>
            Please fill in all the details to create an account
          </Text>

          <Input
            icon={
              <Icon
                name="user"
                size={26}
                strokeWidth={1.6}
                color={theme.colors.text}
              />
            }
            placeholder="Enter your name"
            onChangeText={(text) => setName(text)}
          />

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

          {/* Button */}
          <Button title="Sign Up" loading={isLoading} onPress={onSubmit} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/signIn")}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.semibold,
                },
              ]}
            >
              Sign in
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

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
