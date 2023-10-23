import sql from 'mssql';

import getConnection from "../db"

import { Resend } from 'resend';
import { Acuteness } from "@/types"

import { getAcuteness } from '@/adapters/dataGetters/getAcuteness';

const resend = new Resend('re_123456789');

export async function submitGeneral(meetingData: any) {
  const pool = await getConnection()

  if (!meetingData.comment || !meetingData.announcement) {
    const generalResult = await pool.request().
      query(`
      INSERT INTO GENERAL (Comment, Announcement)
      VALUES ('N/A', 'N/A')
    `)
  } else {
    const generalResult = await pool.request().
      query(`
      INSERT INTO GENERAL (Comment, Announcement)
      VALUES ('${meetingData.comment.general}', '${meetingData.announcement.general}')
    `)
  }
}

export async function submitAction(data: any) {
  const { reported, assigned, center, description, acutenessSelected, item } = data;

  const status = 1
  const reportedBy = reported[2]
  const assignedTo = assigned[2]
  const centerId = center
  const acutenessLevel = acutenessSelected[2]

  const acuteness: Acuteness[] = await getAcuteness()

  const acutenessName = acuteness[acutenessLevel]

  const pool = await getConnection();

  const lastRecordId = await pool.request().query(`SELECT MAX(RecordId) FROM RECORDS`)

  const recordId = Number(lastRecordId) + 1;

  const actionResult = await pool.request()
    .input('ReportedBy', sql.Int, reportedBy)
    .input('AssignedTo', sql.Int, assignedTo)
    .input('StatusId', sql.Int, status)
    .input('CenterId', sql.Int, centerId)
    .input('ActionDescription', sql.VarChar, description)
    .input('Acuteness', sql.Int, acutenessLevel)
    .input('ItemId', sql.VarChar, item)
    .input('RecordId', sql.Int, recordId)
    .query(`
      INSERT INTO ACTIONS (ReportedBy, AssignedTo, StatusId, CenterId, ActionDescription, Acuteness, ItemId)
      VALUES (@ReportedBy, @AssignedTo, @StatusId, @CenterId, @ActionDescription, @Acuteness, @ItemId);
    `);

  const actionId = await pool.request()
    .query('SELECT MAX(ActionId) FROM Actions')

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
    `)

  const request = actionData

  // const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/send`, {
  //   method: 'POST',
  //   body: JSON.stringify(request),
  //   headers: { 'Content-Type': 'application/json' }
  // })

  // const resEmail = res.json()

  return actionId
}

export async function submitComment(data: any) {
  const pool = await getConnection()

  const { generalId, date, item, value } = data

  const recordResult = await pool.request()
    .input('GeneralId', sql.Int, generalId)
    .input('RecordDate', sql.DateTime, date)
    .input('RecordItem', sql.Int, item)
    .input('Value', sql.VarChar, value)
    .query(`
    INSERT INTO MEETINGCOMMENTS (GeneralId, MeetingCommentDate, MeetingCommentItem, [Value])
    VALUES (@GeneralId, @RecordDate, @RecordItem, @Value);
  `);
}

export async function submitRecord(data: any) {
  const pool = await getConnection();

  const { generalId, date, center, item, actionId, value } = data

  const recordResult = await pool.request()
    .input('GeneralId', sql.Int, generalId)
    .input('RecordDate', sql.DateTime, date)
    .input('RecordCenter', sql.Int, center)
    .input('RecordItem', sql.Int, item)
    .input('ActionId', sql.Int, actionId)
    .input('Value', sql.VarChar, value)
    .query(`
      INSERT INTO RECORDS (GeneralId, RecordDate, RecordCenter, RecordItem, ActionId, [Value])
      VALUES (@GeneralId, @RecordDate, @RecordCenter, @RecordItem, @ActionId, @Value);
    `);
}