const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function connect() {
  return open({
    filename: "./db/career_insight.db",
    driver: sqlite3.Database,
  });
}

async function getCompanies() {
  const db = await connect();
  const companies = await db.all(`SELECT company_id, company_name
    FROM  Company
    `);

  console.log("dbConnector got data", companies.length);

  return companies;
}

async function getPositions(title) {
  const db = await connect();
  const positions = await db.all(`SELECT p.*,c.*
    FROM Position AS p JOIN Company AS c USING(company_id)
    WHERE title LIKE "%${title}%";
    `);
  console.log("dbConnector got data", positions.length);
  return positions;
}

async function addUser(name, graduation_school) {
  const db = await connect();
  await db.all(`INSERT INTO User(name, graduation_school) VALUES ("${name}", "${graduation_school}");
    `);
  const user = await db.all(`SELECT * FROM User WHERE name="${name}";`);
  console.log("dbConnector got data", user);
  return user;
}

async function addInterest(name, category_name) {
  const db = await connect();
  try {
    const user = await db.all(
      `SELECT * FROM User WHERE name="${name}" LIMIT 1;`
    );
    const category = await db.all(
      `SELECT * FROM Category WHERE category_name="${category_name}" LIMIT 1;`
    );

    await db.all(`INSERT INTO Interest(user_id, category_id) VALUES ("${user[0].user_id}", "${category[0].category_id}");
    `);
    const interest = { name, category_name };
    return interest;
  } catch (error) {
    return null;
  }
}

async function deleteInterest(name, category_name) {
  const db = await connect();
  try {
    const user = await db.all(
      `SELECT * FROM User WHERE name="${name}" LIMIT 1;`
    );
    const category = await db.all(
      `SELECT * FROM Category WHERE category_name="${category_name}" LIMIT 1;`
    );

    await db.all(`DELETE FROM Interest WHERE user_id=${user[0].user_id} AND category_id = ${category[0].category_id};
    `);
    const interest = { name, category_name };
    return interest;
  } catch (error) {
    return null;
  }
}

async function updateSalary(positionId, salary) {
  const db = await connect();
  try {
    await db.all(
      `UPDATE Position SET base_salary=${salary} WHERE position_id = ${positionId};`
    );
    const position = await db.all(
      `SELECT * FROM Position WHERE position_id=${positionId};`
    );
    return position;
  } catch (error) {
    return null;
  }
}

module.exports = {
  getCompanies,
  getPositions,
  addUser,
  addInterest,
  deleteInterest,
  updateSalary,
};
