"use server";

import { FormState } from "src/lib/common.types";
import { registerSchema } from "src/lib/schema";

export async function registerAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Form verisini doğrula
    const parsedData = registerSchema.safeParse({
      username: formData.get("confirmPassword"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!parsedData.success) {
      return { errors: parsedData.error.flatten().fieldErrors };
    }

    /**
     * Registeration actions
     */
    return { message: "Register successful" };
  } catch (error) {
    console.error(error);
    return { errors: { username: "Server error" } };
  }
}
