import getConnection from "../../db";
import { NextResponse } from "next/server";
import sql from 'mssql';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const pool = await getConnection();

  const result = await pool.request()
  .input('CenterId', sql.Int, id)
  .query('SELECT * FROM CENTERS WHERE CenterId = @CenterId;')

  const centers = result.recordset;

  return NextResponse.json(centers);
}