import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    apiWorking: true,
    serverTime: new Date().toISOString(),
  });
}
