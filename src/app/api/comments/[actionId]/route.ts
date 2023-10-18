import getConnection from "../../db";
import { NextResponse } from "next/server";
import sql from 'mssql';

export async function GET(
  request: Request,
  { params }: { params: { actionId: string } }
) {
  const id = params.actionId

  const pool = await getConnection();

  const result = await pool.request()
    .input('ActionId', sql.Int, id)
    .query(`
    SELECT
    C.CommentId,
    C.CommentAction,
    U.Username AS CommentedBy,
    C.CommentDate,
    C.CommentContent
  FROM
    COMMENTS C
  JOIN
    USERS U ON C.CommentedBy = U.UserId WHERE CommentAction = @ActionId
  `)

  const centers = result.recordset;

  return NextResponse.json(centers);
}