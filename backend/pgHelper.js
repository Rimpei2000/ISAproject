const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  // temporarily hard coded the connectionString
  // connectionString: process.env.DATABASE_URL,
  connectionString:
    "postgres://ovyyrifqiuffma:6b4ad0dae253dea9138d7e125c325894665379e4a29d1b55c973bb45cb5ba132@ec2-3-88-243-238.compute-1.amazonaws.com:5432/db5seb9d0002ik",
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log("not connected");
client.connect();
console.log("connected");

// ADD NEW USER
let addUser = async (userInput) => {
  const query = {
    text: `INSERT INTO USER_INFO VALUES ((SELECT MAX(USER_INFO_ID) + 1 FROM USER_INFO), $1, $2, 20, $3)`,
    values: [
      userInput.newUserName,
      userInput.newUserPassword,
      userInput.newUserLocation,
    ],
  };
  return await client
    .query(query)
    .then((res) => res)
    .catch((err) => console.log(err));
};

// CHECK USER
let checkUser = async (userInput) => {
  const query = {
    text: `SELECT * FROM USER_INFO WHERE user_info_name=$1
      AND user_info_password = encode(encrypt(convert_to($2, 'utf8'), 'ENC_KEY', 'aes'), 'hex');;`,
    values: [userInput.userName, userInput.userPassword],
  };
  return await client
    .query(query)
    .then((res) => res["rows"])
    .catch((err) => console.log(err));
};

// DELETE USER
let deleteUser = async (userInput) => {
  console.log(userInput);
  const query = {
    text: `DELETE FROM user_info WHERE user_info_name=$1;`,
    values: [userInput.username],
  };
  return await client
    .query(query)
    .then((res) => res)
    .catch((err) => console.log(err));
};

//UPDATE Location
let updateLocation = async (userInput) => {
  console.log(userInput);
  const query = {
    text: `UPDATE user_info SET user_info_location_id = $1 WHERE user_info_name = $2;`,
    values: [userInput.newLocation, userInput.userName],
  };
  return await client
    .query(query)
    .then((res) => res)
    .catch((err) => console.log(err));
};

let sendMsg = async (userInput) => {
  const query = {
    text: "INSERT INTO messages VALUES ((SELECT MAX(message_id) + 1 FROM messages), $1, $2);",
    values: [userInput.username, userInput.msg],
  };
  return await client
    .query(query)
    .then((res) => res)
    .catch((err) => console.log(err));
};

let endpointRequested = async (userInput) => {
  const query = {
    text: "UPDATE endpoints SET endpoint_requested = endpoint_requested + 1 WHERE endpoint_uri=$1;",
    values: [userInput.endpoint_uri],
  };
  return await client
    .query(query)
    .then((res) => res)
    .catch((err) => console.log(err));
};

let getRequests = async () => {
  const query = {
    text: "SELECT * FROM endpoints ORDER BY endpoint_id;",
  };
  return await client
    .query(query)
    .then((res) => res)
    .catch((err) => console.log(err));
};

let getUserIdByName = async (userInput) => {
  const query = {
    text: "SELECT user_info_id FROM user_info WHERE user_info_name=$1;",
    values: [userInput.user_name],
  };
  return await client
    .query(query)
    .then((res) => res["rows"]["user_info_id"])
    .catch((err) => console.log(err));
};

let addFav = async (userInput) => {
  const query = {
    text: "INSERT INTO favorites VALUES ($1, $2, $3, $4, $5);",
    values: [
      userInput.userName,
      userInput.favName,
      userInput.favCat,
      userInput.lat,
      userInput.lng,
    ],
  };
  return await client
    .query(query)
    .then((res) => res)
    .catch((err) => console.log(err));
};

let getDistinctFav = async (userInput) => {
  console.log(userInput);
  const query = {
    text: "SELECT * FROM favorites WHERE user_name=$1;",
    values: [userInput.userName],
  };
  return await client
    .query(query)
    .then((res) => res)
    .catch((err) => console.log(err));
};

// export modules
module.exports = {
  addUser,
  checkUser,
  deleteUser,
  updateLocation,
  sendMsg,
  endpointRequested,
  getRequests,
  getUserIdByName,
  addFav,
  getDistinctFav,
};
