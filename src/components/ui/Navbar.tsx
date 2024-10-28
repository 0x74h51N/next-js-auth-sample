import WeatherWidget from "./WeatherWidget";
import UserMenu from "./UserMenu";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { mockUsers } from "src/lib/mockDB";
import { verifySession } from "src/app/actions/utils";

export default async function Navbar() {
  const key = process.env.JWT_SECRET;
  const secretKey = new TextEncoder().encode(key);
  const token = await verifySession();
  if (!token) {
    redirect("/login");
  }

  /**
   * Çerezde tuttuğumuz JWT'den kullanıcının id'sini aldık
   * Bu id'e göre db sorgusu yapıp kullanıcıyı buluyoruz
   */
  const user = mockUsers.find((u) => u.id === token.id);
  return (
    <nav className="cool-bg text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          {user?.admin ? "Admin" : "Customer"}
          {"  Dashboard"}
        </div>
        <div className="flex items-center space-x-4">
          <WeatherWidget />
          <UserMenu username={user?.name ?? ""} />
        </div>
      </div>
    </nav>
  );
}
