import { NextResponse } from "next/server";
import sql from 'mssql'

import generatePassword from "@/domain/encrypt";
import getConnection from "../db";


export async function GET() {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT U.UserId, U.Username, U.Email, R.[Role], C.Center
    FROM USERS U
    INNER JOIN ROLES R ON U.RoleId = R.RoleId
    INNER JOIN CENTERS C ON U.CenterId = C.CenterId
  `);

  const users = result.recordset;

  return NextResponse.json(users);
}

export async function POST(request: any) {
  const { Username, Passcode, RoleId, CenterId, Email } = await request.json();

  const pool = await getConnection();

  const Password = await generatePassword(Passcode);

  const result = await pool.request()
    .input('Username', sql.VarChar, Username)
    .input('Passcode', sql.VarChar, Password)
    .input('RoleId', sql.Int, RoleId)
    .input('CenterId', sql.Int, CenterId)
    .input('Email', sql.VarChar, Email)
    .query(`
      INSERT INTO USERS (Username, Passcode, RoleId, CenterId, Email)
      VALUES
        (@Username, @Passcode, @RoleId, @CenterId, @Email)
    `)

  NextResponse.json({
    message: 'User was successfully added'
  })
}

export async function DELETE(request: any) {
  const UserId = await request.json();

  const pool = await getConnection();

  const result = await pool.request()
    .input('UserId', sql.Int, UserId)
    .query(`DELETE FROM USERS WHERE UserId = @UserId`);

  NextResponse.json({
    message: 'User was successfully deleted'
  })
}

export async function PUT(request: any) {
  const { UserId, Username, Passcode, RoleId, CenterId, Email } = await request.json();

  const pool = await getConnection();

  if (Passcode === '') {
    const result = await pool.request()
      .input('UserId', sql.Int, UserId)
      .input('Username', sql.VarChar, Username)
      .input('RoleId', sql.Int, RoleId)
      .input('CenterId', sql.Int, CenterId)
      .input('Email', sql.VarChar, Email)
      .query(`
      UPDATE USERS
      SET
        Username = @Username,
        RoleId = @RoleId,
        CenterId = @CenterId,
        Email = @Email
      WHERE
        UserId = @UserId
    `)
  }

  const Password = await generatePassword(Passcode);

  const result = await pool.request()
  .input('Username', sql.VarChar, Username)
  .input('Passcode', sql.VarChar, Password)
  .input('RoleId', sql.Int, RoleId)
  .input('CenterId', sql.Int, CenterId)
  .input('Email', sql.VarChar, Email)
    .query(`
      UPDATE USERS
      SET
        Username = @Username,
        Passcode = @Password,
        RoleId = @RoleId,
        CenterId = @CenterId,
        Email = @Email
      WHERE
        UserId = @UserId
    `)

  NextResponse.json({
    message: 'User was successfully edited.'
  })
}