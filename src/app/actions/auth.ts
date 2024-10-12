"use server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { loginSchema } from "src/lib/schema";
import { mockUsers } from "src/lib/mockDB";
import { FormState } from "src/lib/common.types";
import { redirect } from "next/navigation";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function submitAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const errorMessage = {
      email: "Invalid password or email",
      password: "Invalid password or email",
    };

    const parsedData = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (!parsedData.success) {
      return { errors: parsedData.error.flatten().fieldErrors };
    }

    const user = mockUsers.find((u) => u.email === parsedData.data.email);

    if (!user) {
      return { errors: errorMessage };
    }

    const passwordMatch = await bcrypt.compare(
      parsedData.data.password,
      user.passwordHash
    );

    if (!passwordMatch) {
      return { errors: errorMessage };
    }

    const token = await new SignJWT({ id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("155secs")
      .sign(secretKey);

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 150,
    });

    return { message: "Login successful" };
  } catch (error) {
    console.error(error);
    return { errors: { email: "Server error" } };
  }
}

export const logout = async () => {
  cookies().delete("token");
  redirect("/login");
};
