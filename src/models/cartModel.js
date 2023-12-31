const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'ecommerce_jap',
  connectionLimit: 5,
});

const getCart = async () => {
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT * FROM cart`
    );

    return rows;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }

  return false;
};

const getProductById = async (id) => {
  let conn;
  
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT * FROM cart WHERE id=?`,
      [id]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }

  return false;
};

const getProductByName = async (name) => {
  let conn;
  
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT * FROM cart WHERE name=?`,
      [name]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }

  return false;
};

const createProduct = async (user) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO cart(id, count, currency, image, name, unitCost) VALUE(?, ?, ?, ?, ?, ?)`,
      [user.id, user.count, user.currency, user.image, user.name, user.unitCost]
    );

    return { id: parseInt(response.insertId), ...user };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }

  return false;
};

const updateProductCount = async (id, user) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE cart SET count=? WHERE id=?`,
      [user.count, id]
    );

    return { id, ...user };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }

  return false;
};

const deleteCartProduct = async (id) => {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.query(`DELETE FROM cart WHERE id=?`, [id]);

    return true;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }

  return false;
};

module.exports = {
  getCart,
  getProductById,
  getProductByName,
  createProduct,
  deleteCartProduct,
  updateProductCount,
};
