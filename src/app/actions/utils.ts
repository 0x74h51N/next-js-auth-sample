import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export const verifySession = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");
  if (!token) {
    return false;
  }
  const { payload } = await jwtVerify(token.value, secretKey);

  if (!payload?.id) {
    return false;
  }
  return payload;
};
