import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { mockUsers } from "src/lib/mockDB";
import React from "react";

async function DashboardPage() {
  const key = process.env.JWT_SECRET;
  const secretKey = new TextEncoder().encode(key);
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const { payload } = await jwtVerify(token!, secretKey);
  const user = mockUsers.find((u) => u.id === payload.id);

  if (!user) {
    redirect("/login");
  }

  return <>{user?.admin ? <AdminPage /> : <CustomerPage />}</>;
}
export default DashboardPage;

const AdminPage = () => {
  return (
    <div className="text-4xl flex h-full w-full justify-center items-center">
      Admin Page
    </div>
  );
};

const CustomerPage = () => {
  return (
    <div className="text-4xl flex h-full w-full justify-center items-center">
      Customer Dashboard
    </div>
  );
};
