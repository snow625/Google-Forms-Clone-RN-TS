import { useState } from "react";

import { ScrollView, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button, Card, TextInput, useTheme, HelperText } from "react-native-paper";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfo, PersonalInfoSchema } from "../../src/schema/checkout.schema";
import ControlledInput from "../../src/components/ControlledInput";

import { useCheckoutContext } from "../../src/context/CheckoutContext";

const PersonalDetails = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
  });

  const { setPersonal } = useCheckoutContext();

  const router = useRouter();
  const theme = useTheme();

  const nextPage = (data: PersonalInfo) => {
    setPersonal(data);
    router.push("/checkout/delivery");
  };

  return (
    <ScrollView
      contentContainerStyle={{ gap: 15, maxWidth: 500, width: "100%", alignSelf: "center" }}
      showsVerticalScrollIndicator={false}
    >
      <Card style={{ backgroundColor: theme.colors.background }}>
        <Card.Title title="Personal info" titleVariant="titleLarge" />
        <Card.Content style={{ gap: 10 }}>
          <ControlledInput control={control} name="name" label="Name" placeholder="Jon" />
          <ControlledInput
            control={control}
            name="email"
            label="Email"
            placeholder="jon123@gmail.com"
          />
        </Card.Content>
      </Card>
      <Card style={{ backgroundColor: theme.colors.background }}>
        <Card.Content style={{ gap: 10 }}>
          <ControlledInput
            control={control}
            name="password"
            label="Password"
            placeholder="****"
            // secureTextEntry
          />
          <ControlledInput
            control={control}
            name="conformPassword"
            label="Conform password"
            placeholder="****"
            // secureTextEntry
          />
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={handleSubmit(nextPage)}>
        Next
      </Button>
    </ScrollView>
  );
};

export default PersonalDetails;
