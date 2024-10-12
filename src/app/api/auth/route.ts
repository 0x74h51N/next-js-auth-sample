import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { loginSchema } from "src/lib/schema";
import { mockUsers } from "src/lib/mockDB";

// Route handler for POST requests
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const errorMessage = {
      email: "Invalid password or email",
      password: "Invalid password or email",
    };
    const maxAge = 60 * 60;
    const parsedData = loginSchema.safeParse({
      email: data.get("email"),
      password: data.get("password"),
    });
    if (!parsedData.success) {
      return NextResponse.json(
        {
          errors: parsedData.error.flatten().fieldErrors,
        },
        { status: 401 }
      );
    }
    // Find the user in the mock database
    const user = mockUsers.find((u) => u.email === parsedData.data.email);

    if (!user) {
      return NextResponse.json({ errors: errorMessage }, { status: 401 });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(
      parsedData.data.password,
      user.passwordHash
    );
    if (!passwordMatch) {
      return NextResponse.json({ errors: errorMessage }, { status: 401 });
    }

    // Create JWT token
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h") // Token validity period
      .sign(secretKey);

    const production = process.env.NODE_ENV === "production";

    // Set the JWT token as an HttpOnly cookie
    const response = NextResponse.json({ message: "Login successful" });
    cookies().set("token", token, {
      httpOnly: true,
      secure: production,
      sameSite: "strict",
      maxAge: maxAge,
      path: "/",
    });

    // Return the response
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
