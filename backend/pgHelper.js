const {
    Client
  } = require('pg');
  require('dotenv').config();

  const client = new Client({

    // temporarily hard coded the connectionString
    // connectionString: process.env.DATABASE_URL,
    connectionString: "postgres://ovyyrifqiuffma:6b4ad0dae253dea9138d7e125c325894665379e4a29d1b55c973bb45cb5ba132@ec2-3-88-243-238.compute-1.amazonaws.com:5432/db5seb9d0002ik",
    ssl: {
      rejectUnauthorized: false
    }

  });

  console.log('not connected')
  client.connect();
  console.log('connected')

  // ADD NEW USER
    let addUser = async(userInput) => {
      const query = {
        text: `INSERT INTO USER_INFO VALUES ((SELECT MAX(USER_INFO_ID) + 1 FROM USER_INFO), $1, $2, 20, $3)`,
        values: [
          userInput.newUserName,
          userInput.newUserPassword,
          userInput.newUserLocation,
        ]
      }
      return (
        await client
        .query(query)
        .then(res => res)
        .catch(err => console.log(err))
      )
    }

    // CHECK USER
  let checkUser = async(userInput) => {
    const query = {
      text: `SELECT * FROM USER_INFO WHERE user_info_name=$1
      AND user_info_password = encode(encrypt(convert_to($2, 'utf8'), 'ENC_KEY', 'aes'), 'hex');;`,
      values: [
        userInput.userName,
        userInput.userPassword,
      ]
    }
    return (
      await client
      .query(query)
      .then(res => res["rows"])
      .catch(err => console.log(err)))
  }

  // DELETE USER
  let deleteUser = async (userInput) => {
    const query = {
      text: `DELETE FROM user_info WHERE user_info_id=$1;`,
      values: [
        userInput.userId
      ]
    }
    return (
      await client
      .query(query)
      .then(res => res)
      .catch(err => console.log(err)))
  }

  // export modules
module.exports = {
  addUser,
  checkUser,
  deleteUser,
}
