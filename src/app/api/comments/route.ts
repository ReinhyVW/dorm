import getConnection from "../db";
import { NextResponse } from "next/server";
import sql from 'mssql';

export async function GET() {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT * FROM COMMENTS
  `);

  const items = result.recordset;

  return NextResponse.json(items);
}

export async function POST(request: any) {
  const pool = await getConnection();

  const { ActionId, UserId, commentContent } = await request.json();

  const result = await pool.request()
    .input('ActionId', sql.Int, ActionId)
    .input('UserId', sql.Int, UserId)
    .input('CommentContent', sql.VarChar, commentContent)
    .query(`
      INSERT INTO COMMENTS (CommentAction, CommentedBy, CommentContent)
      VALUES (@ActionId, @UserId, @CommentContent)
    `);

  NextResponse.json({
    message: 'New Comment Added successfully'
  });
}