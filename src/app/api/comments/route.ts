import getConnection from "../db";
import { NextResponse } from "next/server";
import sql from 'mssql';

export async function GET() {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(`
      SELECT
        C.CommentId,
        C.CommentAction,
        U.Username AS CommentedBy,
        C.CommentDate,
        C.CommentContent
      FROM
        COMMENTS C
      JOIN
        USERS U ON C.CommentedBy = U.UserId;
    `);

    const items = result.recordset;

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({
      message: error
    })
  }
}

export async function POST(request: any) {
  try {
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

    return NextResponse.json({
      message: 'New Comment Added successfully'
    });
  } catch (error) {
    return NextResponse.json({
      message: error
    })
  }
}
