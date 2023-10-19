import getConnection from "../db";
import { NextResponse } from "next/server";
import sql from 'mssql';

export async function GET() {

  const pool = await getConnection();

  const result = await pool.request()
    .query(`
    SELECT
      A.ActionId,
      A.ReportedOn AS AssignedOn,
      U1.Username AS ReportedBy,
      U1.Email AS ReportedByEmail,
      U2.Username AS AssignedTo,
      U2.Email AS AssignedToEmail,
      I.Item AS Item,
      S.StatusId,
      A.ActionDescription,
      A.Acuteness,
      C.Center,
      A.Resolution
    FROM
      ACTIONS A
    JOIN
      USERS U1 ON A.ReportedBy = U1.UserId
    JOIN
      USERS U2 ON A.AssignedTo = U2.UserId
    JOIN
      ITEMS I ON A.ItemId = I.ItemId
    JOIN
      [STATUS] S ON A.StatusId = S.StatusId
    JOIN
      CENTERS C ON A.CenterId = C.CenterId
    `);

  const actions = result.recordset;

  return NextResponse.json(actions);
}


export async function PUT(
  request: Request,
  { params }: { params: { actionId: string } }
) {
  try {
    const ActionId = params.actionId

    const pool = await getConnection();

    const { StatusId, Resolution } = await request.json();

    const result = await pool.request()
      .input('ActionId', sql.Int, ActionId)
      .input('StatusId', sql.Int, StatusId)
      .input('Resolution', sql.VarChar, Resolution)
      .query(`
        UPDATE ACTIONS SET
          StatusId = @StatusId,
          Resolution = @Resolution
        WHERE
          ActionId = @ActionId
      `);

    return NextResponse.json({
      message: 'Action updated successfully'
    });
  } catch (error) {
    return NextResponse.json({
      message: error
    })
  }
}
