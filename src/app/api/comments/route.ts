import getConnection from "../db";
import { NextResponse } from "next/server";
import sql from 'mssql';

export async function GET() {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(`
      SELECT * FROM COMMENTS
    `);

    const items = result.recordset;

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.error("Internal Server Error", 500);
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
    console.error("Error adding comment:", error);
    return NextResponse.json("Internal Server Error");
  }
}
