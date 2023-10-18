import getConnection from "../db";

export async function getItemsForRecords() {
  const pool = await getConnection();

  const Items = await pool.request().query('SELECT * FROM ITEMS');

  const checkItems = await Items.recordset

  const itemsArray = {}

  for (const item of checkItems) {
    item.Item = item.Item.replace(/ /g, '');

    const key = item.ItemId;
    const value = item.ItemId;

    itemsArray[key] = Number(item.ItemId);
    itemsArray[value] = item.Item;
  }

  return itemsArray;
}

export async function getLastGeneralId() {
  const pool = await getConnection();

  const generalIdQuery = await pool.request().query('SELECT GeneralId FROM GENERAL ORDER BY GeneralId DESC OFFSET 0 ROWS FETCH NEXT 1 ROW ONLY')

  const generalId = generalIdQuery.recordset[0].GeneralId

  return generalId
}

export async function getLastActionId() {
  const pool = await getConnection();

  const actionIdQuery = await pool.request().query('SELECT ActionId FROM ACTIONS ORDER BY ActionId DESC OFFSET 0 ROWS FETCH NEXT 1 ROW ONLY')

  const actionId = actionIdQuery.recordset[0].GeneralId

  return actionId
}
