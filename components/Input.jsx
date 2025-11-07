import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const Input = (props) => {
  return (
    <View
      style={[styles.container, props.containerStyle && props.containerStyle]}
    >
      {props.icon && props.icon}

      <TextInput
        style={{ flex: 1 }}
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        placeholderTextColor={theme.colors.textLight}
        onChangeText={props.onChangeText}
        value={props.value}
        multiline={props.multiline}
        ref={props.inputRef}
        autoCorrect={true}
        autoCapitalize="sentences"
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hp(7.2),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    paddingHorizontal: 18,
    gap: 12,
  },
});
