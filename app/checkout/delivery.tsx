import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button, Card, TextInput, useTheme, RadioButton, HelperText } from "react-native-paper";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeliveryInfoSchema, DeliveryInfo } from "../../src/schema/checkout.schema";
import ControlledInput from "../../src/components/ControlledInput";

import { useCheckoutContext } from "../../src/context/CheckoutContext";

const DeliveryDetails = () => {
  const { control, handleSubmit } = useForm<DeliveryInfo>({
    resolver: zodResolver(DeliveryInfoSchema),
    defaultValues: {
      shipping: "fast",
    },
  });

  const { setDelivery } = useCheckoutContext();

  const router = useRouter();

  const theme = useTheme();

  const nextPage = (data: DeliveryInfo) => {
    setDelivery(data);
    router.push("/checkout/payment");
  };

  return (
    <ScrollView
      contentContainerStyle={{ gap: 15, maxWidth: 500, width: "100%", alignSelf: "center" }}
      showsVerticalScrollIndicator={false}
    >
      <Card style={{ backgroundColor: theme.colors.background }}>
        <Card.Title title="Deliver address" titleVariant="titleLarge" />
        <Card.Content style={{ gap: 10 }}>
          <ControlledInput control={control} name="city" label="City" />
          <ControlledInput control={control} name="postalCode" label="Postal code" />
          <ControlledInput control={control} name="address" label="Address" />
        </Card.Content>
      </Card>
      <Card style={{ backgroundColor: theme.colors.background }}>
        <Card.Title title="Shipping options" titleVariant="titleLarge" />
        <Card.Content style={{ gap: 10 }}>
          <Controller
            name="shipping"
            control={control}
            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
              <View>
                <HelperText type="error" visible={invalid}>
                  {error?.message}
                </HelperText>
                <RadioButton.Group value={value} onValueChange={(value) => onChange(value)}>
                  <RadioButton.Item label="Free" value="free" />
                  <RadioButton.Item label="Fast" value="fast" />
                  <RadioButton.Item label="Same day" value="some_day" />
                </RadioButton.Group>
              </View>
            )}
          />
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={handleSubmit(nextPage)}>
        Next
      </Button>
      {/* <Link href='/checkout/payment'>Next</Link> */}
    </ScrollView>
  );
};

export default DeliveryDetails;
