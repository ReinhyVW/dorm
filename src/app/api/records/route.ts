import { NextResponse } from "next/server";

import sql from 'mssql';

import getConnection from "../db";
import { submitGeneral, submitAction, submitRecord, submitComment } from "./queries";
import { getLastGeneralId, getLastActionId } from "./domain"

export async function GET() {
  const pool = await getConnection();

  const result = await pool.request().query('SELECT * FROM RECORDS');

  const records = result.recordset;

  return NextResponse.json(records);
}

export async function POST(request: any) {
  const { data } = await request.json();

  const meetingData = data.groupedData

  const actionData = data.groupedActionData

  const generalResult = await submitGeneral(meetingData)

  const generalId = await getLastGeneralId()

  const pool = await getConnection();

  const date = data.date

  for (const item in meetingData) {
    const currentActionData = actionData[item];

    if (meetingData.hasOwnProperty(item)) {

      for (const center in meetingData[item]) {
        const value = meetingData[item][center];

        if (item === '1') {
          const recordData = { generalId, date, center, item, value };
          console.log(center);
          submitRecord(recordData);
        } else if (item === 'comment') {
          const commentData = { generalId, date, item, value };
          console.log('Submitting comment:', commentData);
          submitComment(commentData);
        } else {
          if (value === '0') {
            const { reported, assigned, description, acuteness } = currentActionData;
            const actionData = { reported, assigned, center, description, acuteness, item };
            submitAction(actionData);

            console.log(center);

            const actionId = await getLastActionId();

            const recordData = { generalId, date, center, item, value, actionId };
            submitRecord(recordData);
          } else {
            const recordData = { generalId, date, center, item, value };
            submitRecord(recordData);
          }
        }
      }
    }
  }


  return NextResponse.json({ data: data });
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
      // Check if one row was affected (update successful)
      return NextResponse.json({
        message: 'Center was successfully edited',
      });
    } else {
      // No rows were affected (CenterId not found)
      return NextResponse.json({ error: 'Center not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error editing center:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
