const mySql2 = require('mysql2/promise');

let pool;

const createPool = async () => {
  if (pool) return pool;

  pool = await mySql2.createPool({
    connectionLimit: 50,
    host: "153.92.7.247",
   // host: "39.48.153.157",
    user: "matzsolu_root_iccd",
    password: "Windows!@#$5678",
    database: "matzsolu_iccd"

  });

  return pool;
};

const getConnectionFromPool = async () => {
  const pool = await createPool();
  try {
    const connection = await pool.getConnection();
    console.log("Sql Connected");
    return connection;
  } catch (err) {
    console.error("Error getting connection from pool:", err);
    throw err;
  }
};

module.exports = { createPool, getConnectionFromPool };
