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
        A.ReportedOn AS AssignedOn,
        U1.Username AS ReportedBy,
        U2.Username AS AssignedTo,
        I.Item AS Item,
        S.StatusId,
        A.ActionDescription
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
    WHERE ActionId = @ActionId
    `);

  const actions = result.recordset;

  return NextResponse.json(actions);
}