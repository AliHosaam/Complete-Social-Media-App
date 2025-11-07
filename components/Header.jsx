import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import BackButton from "./BackButton";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";

const Header = ({ title, showBackButton = true, mb = 10 }) => {
  const router = useRouter();

  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showBackButton && (
        <View style={styles.showBackButton}>
          <BackButton router={router} />
        </View>
      )}
      <Text style={styles.title}>{title ? title : ""}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 5,
  },
  showBackButton: {
    position: "absolute",
    left: 0,
  },
  title: {
    fontSize: hp(2.7),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textDarK,
  },
});
