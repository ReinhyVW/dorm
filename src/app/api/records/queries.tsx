import sql from 'mssql';

import getConnection from "../db"

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
  const { reported, assigned, center, description, acuteness, item } = data;

  const status = 1
  const reportedBy = reported[2]
  const assignedTo = assigned[2]
  const centerId = center
  const acutenessLevel = acuteness[2]

  const pool = await getConnection();

  // const lastRecordId = await pool.request().query(`SELECT MAX(RecordId) FROM RECORDS`)

  // const recordId = Number(lastRecordId) + 1;

  const actionResult = await pool.request()
    .input('ReportedBy', sql.Int, reportedBy)
    .input('AssignedTo', sql.Int, assignedTo)
    .input('StatusId', sql.Int, status)
    .input('CenterId', sql.Int, centerId)
    .input('ActionDescription', sql.VarChar, description)
    .input('Acuteness', sql.Int, acutenessLevel)
    .input('ItemId', sql.VarChar, item)
    // .input('RecordId', sql.Int, recordId)
    .query(`
      INSERT INTO ACTIONS (ReportedBy, AssignedTo, StatusId, CenterId, ActionDescription, Acuteness, ItemId)
      VALUES (@ReportedBy, @AssignedTo, @StatusId, @CenterId, @ActionDescription, @Acuteness, @ItemId);
    `);

  const actionId = await pool.request()
    .query('')

  return actionId
}

export async function submitComment(data:  any) {
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