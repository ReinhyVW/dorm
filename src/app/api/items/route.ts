import getConnection from "../db";
import { NextResponse } from "next/server";
import sql from 'mssql';

export async function GET() {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT I.ItemId, I.Item, IT.[Type] AS ItemType
    FROM ITEMS AS I
    INNER JOIN ITEMSTYPE AS IT ON I.ItemType = IT.TypeId;
  `);

  const items = result.recordset;

  return NextResponse.json(items);
}

export async function POST(request: any) {
  const { Item, ItemType } = await request.json();

  try {
    const pool = await getConnection();

    const result2 = await pool.request()
      .query(`
        ALTER TABLE RECORDS
        ADD ${Item.replace(/\s/g, '')} VARCHAR(50)
      `);

    // Then, insert the data into the ITEMS table
    const result = await pool.request()
      .input('Item', sql.VarChar, Item)
      .input('ItemType', sql.VarChar, ItemType)
      .query(`
        INSERT INTO ITEMS (Item, ItemType)
        VALUES (@Item, @ItemType)
      `);

    NextResponse.json({
      message: 'New Item Added successfully'
    });
  } catch (error) {
    NextResponse.json({
      error: 'An error occurred while processing the request.'
    });
  }
}

export async function DELETE(request: any) {
  const ItemId = await request.json();

  const pool = await getConnection();

  const itemName = await pool.request()
    .input('ItemId', sql.Int, ItemId)
    .query("SELECT Item FROM ITEMS WHERE ItemId = @ItemId");

  const result2 = await pool.request()
    .query(`
      ALTER TABLE RECORDS
      DROP COLUMN ${itemName.recordset[0].Item.replace(/\s/g, '')}
    `);

  const result = await pool.request()
    .input('ItemId', sql.Int, ItemId)
    .query(`
      DELETE FROM ITEMS WHERE ItemId = @ItemId
    `);

  NextResponse.json({
    message: 'Check Type was deleted successfully'
  })
}

export async function PUT(request: any) {
  const { ItemId, prevItem, Item, ItemType } = await request.json();

  const pool = await getConnection();

  const result = await pool.request()
    .input('ItemId', sql.Int, ItemId)
    .input('Item', sql.VarChar, Item)
    .input('ItemType', sql.Int, ItemType)
    .query(`
      UPDATE ITEMS
      SET
        Item = @Item,
        ItemType = @ItemType
      WHERE 
        ItemId = @ItemId;
    `);

  const result2 = await pool.request()
    .query(`
        EXEC sp_rename 'RECORDS.${prevItem.replace(/\s/g, '')}', '${Item.replace(/\s/g, '')}', 'COLUMN';
      `);

  NextResponse.json({
    message: 'Check Type was successfully edited'
  })
}