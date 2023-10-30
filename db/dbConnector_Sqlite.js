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
  const companies =
    await db.all(`SELECT company_id, company_name
    FROM  Company
    `);

  console.log("dbConnector got data", companies.length);

  return companies;
}

async function getPositions(title){
  const db = await connect();
  const positions = 
    await db.all(`SELECT p.*,c.*
    FROM Position AS p JOIN Company AS c USING(company_id)
    WHERE title LIKE "%${title}%";
    `)
  console.log("dbConnector got data", positions.length);
  return positions;
}

async function addUser(name, graduation_school){
  const db = await connect();
  await db.all(`INSERT INTO User(name, graduation_school) VALUES ("${name}", "${graduation_school}");
    `)
  const user = await db.all(`SELECT * FROM User WHERE name="${name}";`)
  console.log("dbConnector got data", user);
  return user;
}


module.exports = {
  getCompanies,
  getPositions,
  addUser
};
