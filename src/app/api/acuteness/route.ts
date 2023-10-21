import getConnection from "../db";
import { NextResponse } from "next/server";
import sql from 'mssql';

export async function GET() {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT * FROM ACUTENESS
  `)

  const acuteness = result.recordset;

  return NextResponse.json(acuteness);
}
