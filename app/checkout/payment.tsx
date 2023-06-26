import { Alert, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { Button, Card, useTheme, TextInput, Checkbox } from "react-native-paper";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentInfoSchema, PaymentInfo } from "../../src/schema/checkout.schema";
import ControlledInput from "../../src/components/ControlledInput";

import { useCheckoutContext } from "../../src/context/CheckoutContext";

const PaymentDetails = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInfo>({
    resolver: zodResolver(PaymentInfoSchema),
  });

  const { setPayment, onSubmitAll } = useCheckoutContext();

  const router = useRouter();
  const theme = useTheme();

  const onSubmit = async (data: PaymentInfo) => {
    const success = await onSubmitAll(data);
    success ? router.push("/") : Alert.alert("Failed to submit the form");
  };

  return (
    <ScrollView
      contentContainerStyle={{ gap: 15, maxWidth: 500, width: "100%", alignSelf: "center" }}
      showsVerticalScrollIndicator={false}
    >
      <Card style={{ backgroundColor: theme.colors.background }}>
        <Card.Title title="Payment details" titleVariant="titleLarge" />
        <Card.Content style={{ gap: 10 }}>
          <ControlledInput
            control={control}
            name="cardNumber"
            label="Card number"
            placeholder="4242 4242 4242 4242"
          />

          <View style={{ flexDirection: "row", gap: 15 }}>
            <ControlledInput
              control={control}
              name="expirationDate"
              label="Expiration date"
              placeholder="mm/yyyy"
              style={{ flex: 3 }}
            />

            <ControlledInput
              control={control}
              name="securityCode"
              label="Security code"
              style={{ flex: 2 }}
            />
          </View>

          <Controller
            control={control}
            name="saveInfo"
            render={({ field: { value, onChange } }) => (
              <Checkbox.Item
                label="Save payment information"
                onPress={() => onChange(!value)}
                status={value ? "checked" : "unchecked"}
              />
            )}
          />
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </ScrollView>
  );
};

export default PaymentDetails;
