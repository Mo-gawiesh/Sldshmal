import { NextResponse } from "next/server";

/**
 * GET /api/healthz
 * Health check endpoint — replaces the former Express api-server
 */
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
