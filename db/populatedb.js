#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first VARCHAR (255),
  last VARCHAR (255),
  username VARCHAR (255),
  password VARCHAR (255),
  membership VARCHAR (255),
  time VARCHAR (255)
);

INSERT INTO messages (first, last, username, password, membership, time) 
VALUES
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
