import getConnection from "../db";
import { NextResponse } from "next/server";

export async function GET() {
  const pool = await getConnection();

  const result = await pool.request().query('SELECT * FROM ITEMSTYPE');

  const itemtypes = result.recordset;

  return NextResponse.json(itemtypes);
}
