// src/app/api/ping/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    await pool.query("SELECT 1");
    return NextResponse.json({ success: true, message: "NeonDB awake ✅" });
  } catch (err) {
    console.error("Ping failed:", err);
    return NextResponse.json({ success: false, error: "DB ping failed" });
  }
}
