import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./app/actions/utils";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const loginRes = NextResponse.redirect(new URL("/login", req.nextUrl));
  const pathName = req.nextUrl.pathname;

  if (pathName === "/login") {
    const session = await verifySession();
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    return res;
  }

  if (pathName === "/dashboard") {
    const verify = await verifySession();
    if (!verify) {
      if (req.method === "POST" && req.headers.get("next-action")) {
        return res;
      }
      return loginRes;
    }
  }
  return res;
}
