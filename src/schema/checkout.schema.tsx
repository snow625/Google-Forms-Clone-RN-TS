import { z } from "zod";

export const PersonalInfoSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email({ message: "Provide a valid email" }),
    password: z.string(),
    conformPassword: z.string(),
  })
  .refine((data) => data.password === data.conformPassword, {
    message: "Passwords don't match",
    path: ["conformPassword"],
  });

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

// Delivery Form

export const DeliveryInfoSchema = z.object({
  city: z.string().min(1),
  postalCode: z.string(),
  address: z.string(),
  shipping: z.enum(["free", "fast", "some_day"]),
});

export type DeliveryInfo = z.infer<typeof DeliveryInfoSchema>;

// Payment Form

export const PaymentInfoSchema = z.object({
  cardNumber: z
    .string()
    .regex(
      /^(?:3[47]\d{13})|(?:4\d{12}(?:\d{3})?)|(?:5[1-5]\d{14})|(?:6(?:011|5\d{2})\d{12})|(?:(?:2131|1800|35\d{3})\d{11})$/
    ),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{4}$/)
    .refine(
      (val) => {
        const [month, year] = val.split("/");
        const data = new Date(parseInt(year), parseInt(month) - 1);
        return data > new Date();
      },
      { message: "Card is expired" }
    ),
  securityCode: z.coerce.number().gt(100).lte(999),
  saveInfo: z.boolean(),
});

export type PaymentInfo = z.infer<typeof PaymentInfoSchema>;

// all data

export const CheckoutInfoSchema =
  DeliveryInfoSchema.merge(PaymentInfoSchema).merge(PaymentInfoSchema);

export type CheckoutData = z.infer<typeof CheckoutInfoSchema>;
