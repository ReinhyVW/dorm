import getConnection from "../db";
import { NextResponse } from "next/server";
import sql from 'mssql';

import submitEmail from "@/adapters/dataPosters/submitEmail";

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
      S.Status,
      A.ActionDescription,
      A.Acuteness,
      AC.Acuteness AS AcutenessName,
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
    JOIN
      ACUTENESS AC ON A.Acuteness = AC.AcutenessId
    `);




  const actions = result.recordset;

  return NextResponse.json(actions);
}

export async function POST(request: any) {
  try {
    const { reported, assigned, center, description, acutenessSelected, item } = await request.json();

    const status = 1;
    const reportedBy = reported;
    const assignedTo = assigned;
    const centerId = center;
    const acutenessLevel = acutenessSelected[1];

    const pool = await getConnection(); // Make sure to use the correct way to obtain a database connection

    const actionResult = await pool.request()
      .input('ReportedBy', sql.Int, reportedBy)
      .input('AssignedTo', sql.Int, assignedTo)
      .input('StatusId', sql.Int, status)
      .input('CenterId', sql.Int, centerId)
      .input('ActionDescription', sql.VarChar, description)
      .input('Acuteness', sql.Int, acutenessLevel)
      .input('ItemId', sql.VarChar, item)
      .query(`
        INSERT INTO ACTIONS (ReportedBy, AssignedTo, StatusId, CenterId, ActionDescription, Acuteness, ItemId)
        VALUES (@ReportedBy, @AssignedTo, @StatusId, @CenterId, @ActionDescription, @Acuteness, @ItemId);
      `);

    const actionIdResult = await pool.request().query('SELECT MAX(ActionId) as MaxActionId FROM Actions');

    const actionId = actionIdResult.recordset[0]['MaxActionId'];

    const actionData = await pool.request()
      .input('ActionId', sql.Int, actionId)
      .query(`
        SELECT
        A.ActionId,
        A.ReportedOn AS AssignedOn,
        U1.Username AS ReportedBy,
        U2.Username AS AssignedTo,
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
        WHERE
        ActionId = @ActionId
      `);

    const requestAnswer = actionData.recordset;
    console.log(requestAnswer)

    const emailResponse = await submitEmail(actionData)
    
    return NextResponse.json({
      message: 'Record was successfully deleted',
    });
  } catch (error) {
    // Handle any errors and send an appropriate response
    console.error(error);
    return NextResponse.json({ error: error });
  }
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
