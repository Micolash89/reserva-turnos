import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const authRoutes = ["/dashboard/*", "/api/me/*"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  console.log("token", token);

  const enc: Uint8Array = new TextEncoder().encode(
    process.env.SECRET_JWT_TOKEN
  );

  if (token) {
    const { payload } = await jwtVerify(token?.value, enc);
    console.log(payload);
  }

  console.log("token", token);

  return NextResponse.next();
}
