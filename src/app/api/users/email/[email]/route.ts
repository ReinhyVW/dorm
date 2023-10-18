import { NextResponse } from "next/server";
import sql from 'mssql'

import getConnection from "../../../db";


export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  const email = params.email
  const pool = await getConnection();

  const result = await pool.request()
    .input('Email', sql.VarChar, email)
    .query(`
    SELECT * FROM USERS WHERE Email = @Email
  `);

  const users = result.recordset;

  return NextResponse.json(users);
}
