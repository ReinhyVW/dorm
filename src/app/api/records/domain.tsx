import getConnection from "../db";

interface Item {
  ItemId: number;
  Item: string;
  // Add other properties as needed
}

export async function getItemsForRecords(): Promise<{ [key: number]: string }> {
  const pool = await getConnection();

  const result = await pool.request().query('SELECT * FROM ITEMS');

  const itemsArray: { [key: number]: string } = {};

  for (const item of result.recordset as Item[]) {
    const key = item.ItemId;
    const value = item.Item.replace(/ /g, '');

    itemsArray[key] = value;
  }

  return itemsArray;
}

export async function getLastGeneralId(): Promise<number | undefined> {
  const pool = await getConnection();

  const result = await pool.request().query('SELECT GeneralId FROM GENERAL ORDER BY GeneralId DESC OFFSET 0 ROWS FETCH NEXT 1 ROW ONLY');

  const generalId = result.recordset[0]?.GeneralId;

  return generalId;
}

export async function getLastActionId(): Promise<number | undefined> {
  const pool = await getConnection();

  const result = await pool.request().query('SELECT ActionId FROM ACTIONS ORDER BY ActionId DESC OFFSET 0 ROWS FETCH NEXT 1 ROW ONLY');

  const actionId = result.recordset[0]?.ActionId;

  return actionId;
}
