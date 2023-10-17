import { NextResponse } from "next/server";

import getConnection from "../db";

export async function GET() {
  const pool = await getConnection();

  const result = await pool.request().query(`SELECT * FROM [STATUS]`);

  const users = result.recordset;

  return NextResponse.json(users);
}
