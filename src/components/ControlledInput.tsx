import { View } from "react-native";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import { Control, Controller } from "react-hook-form";

type ControlledInputProps = {
  control: Control;
  name: string;
} & React.ComponentProps<typeof TextInput>;

export default function ControlledInput({
  control,
  name,
  style: styleProps,
  ...textInputProps
}: ControlledInputProps) {
  const theme = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onBlur, onChange }, fieldState: { error, invalid } }) => (
        <View style={styleProps}>
          <TextInput
            style={{ backgroundColor: theme.colors.background }}
            {...textInputProps}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={invalid}
          />
          <HelperText type="error" visible={invalid}>
            {error?.message}
          </HelperText>
        </View>
      )}
    />
  );
}
