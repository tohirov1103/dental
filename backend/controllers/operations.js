const { getConnection } = require("../db/connectDb");

const addClient = async (req, res) => {
  const { firstname, lastname, fname, phonenumber, image_url, gender, izoh } =
    req.body;

  try {
    const connection = await getConnection();
    await connection.connect();

    const query =
      'INSERT INTO "Patients" (firstname, lastname, fname, phonenumber, image_url, gender, izoh) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const result = await connection.query(query, [
      firstname,
      lastname,
      fname,
      phonenumber,
      image_url,
      gender,
      izoh,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).send({ message: "User has been created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllClient = async (req, res) => {
  try {
    const connection = await getConnection();
    await connection.connect();
    const query = 'SELECT * FROM "Clients"';
    const result = await connection.query(query);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { addClient, getAllClient };

// 
