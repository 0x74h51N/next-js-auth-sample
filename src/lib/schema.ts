import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Please enter a valid password." }),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(20, { message: "Username must be less than 20 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(20, { message: "Password must be less than 20 characters." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Confirm Password must be at least 8 characters long.",
      })
      .max(20, {
        message: "Confirm Password must be less than 20 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const cities = [
  "Istanbul",
  "London",
  "Paris",
  "Berlin",
  "Sydney",
  "Mumbai",
  "Beijing",
  "Tokyo",
  "New York",
] as const;

export const weatherInpSchema = z.object({
  city: z.enum(cities),
});

export const weatherDataSchema = z.object({
  main: z.object({
    temp: z.number(),
  }),
  weather: z.array(
    z.object({
      main: z.string(),
      icon: z.string(),
    })
  ),
});

export type LoginType = z.infer<typeof loginSchema>;
export type WeatherInpType = z.infer<typeof weatherInpSchema>["city"];

export type RegisterType = z.infer<typeof registerSchema>;
