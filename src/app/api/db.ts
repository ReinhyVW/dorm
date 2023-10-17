import sql from 'mssql';

const dbConfig = {
  user: "NextConnection",
  password: "Noruega23DorHanGe",
  server: "dorm.database.windows.net",
  database: "DORM",
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
};

export default async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
