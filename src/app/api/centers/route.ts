import getConnection from "../db";
import { NextResponse } from "next/server";
import sql from 'mssql';

export async function GET() {
  const pool = await getConnection();

  const result = await pool.request().query(`
  SELECT
    C.CenterId,
    C.Center,
    C.[Address],
    U.Username AS ManagerUsername,
    C.Contact
  FROM
      CENTERS C
  JOIN
      USERS U ON C.Manager = U.UserId;
  `);

  const centers = result.recordset;

  return NextResponse.json(centers);
}

export async function POST(request: any) {
  try {
    const { Center, Address, Manager, Contact } = await request.json();

    const pool = await getConnection();

    const result = await pool
      .request()
      .input('Center', sql.VarChar, Center)
      .input('Address', sql.VarChar, Address)
      .input('Manager', sql.Int, Manager)
      .input('Contact', sql.VarChar, Contact)
      .query(`
        INSERT INTO CENTERS (Center, [Address], Manager, Contact)
        VALUES (@Center, @Address, @Manager, @Contact)
      `);

    if (result.rowsAffected[0] === 1) {
      return NextResponse.json({
        message: 'Center was successfully added',
      });
    } else {
      return NextResponse.json({ error: 'Center could not be added' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error adding center:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 404 });
  }
}

export async function DELETE(request: any) {
  try {
    const CenterId = await request.json();

    const pool = await getConnection();

    const result = await pool.request()
      .input('CenterId', sql.Int, CenterId)
      .query(`DELETE FROM CENTERS WHERE CenterId = @CenterId;`);

    if (result.rowsAffected[0] === 0) {
      return NextResponse.json({ error: 'Center not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Center was successfully deleted',
    });
  } catch (error) {
    console.error('Error deleting center:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: any) {
  try {
    const { CenterId, Center, Address, Manager, Contact } = await request.json();

    const pool = await getConnection(); // Use your getConnection function to get a database connection

    const result = await pool
      .request()
      .input('CenterId', sql.Int, CenterId)
      .input('Center', sql.VarChar, Center)
      .input('Address', sql.VarChar, Address)
      .input('Manager', sql.VarChar, Manager)
      .input('Contact', sql.VarChar, Contact)
      .query(`
        UPDATE CENTERS
        SET Center = @Center,
            [Address] = @Address,
            Manager = @Manager,
            Contact = @Contact
        WHERE CenterId = @CenterId;
      `);

    if (result.rowsAffected[0] === 1) {
      return NextResponse.json({
        message: 'Center was successfully edited',
      });
    } else {
      return NextResponse.json({ error: 'Center not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error editing center:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
