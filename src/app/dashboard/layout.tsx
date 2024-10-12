import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "src/components/ui/Navbar";
import { mockUsers } from "src/lib/mockDB";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const key = process.env.JWT_SECRET;
  const secretKey = new TextEncoder().encode(key);
  const token = cookies().get("token")?.value;
  let user = null;
  if (!token) {
    redirect("/login");
  }
  const { payload } = await jwtVerify(token, secretKey);
  if (payload.id) {
    /**
     * Çerezde tuttuğumuz JWT'den kullanıcının id'sini aldık
     * Bu id'e göre db sorgusu yapıp kullanıcıyı buluyoruz
     */
    user = mockUsers.find((u) => u.id === payload.id);
    return (
      <>
        <Navbar username={user?.name || ""} isAdmin={user?.admin || false} />
        {children}
      </>
    );
  }
  redirect("/login");
}
