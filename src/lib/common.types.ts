export type FormState =
  | {
      errors?: {
        username?: string | string[];
        email?: string | string[];
        password?: string | string[];
        confirmPassword?: string | string[];
      };
      message?: string;
    }
  | undefined;

export type User = {
  email: string;
  passwordHash: string;
  id: number;
  admin: boolean;
  name: string;
};

export type WeatherData = {
  temperature: number;
  condition: string;
  icon: string;
};
