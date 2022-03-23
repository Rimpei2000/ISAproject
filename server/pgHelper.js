const {
    Client
  } = require('pg');
  require('dotenv').config();

  // ====================================
  //           DATABASE QUERIES
  // ====================================

  // heroku postgres database credentials
  // create new Client object with credentials
  const client = new Client({

    // temporarily hard coded the connectionString
    // connectionString: process.env.DATABASE_URL,
    connectionString: "postgres://ovyyrifqiuffma:6b4ad0dae253dea9138d7e125c325894665379e4a29d1b55c973bb45cb5ba132@ec2-3-88-243-238.compute-1.amazonaws.com:5432/db5seb9d0002ik",
    ssl: {
      rejectUnauthorized: false
    }

  });

  console.log('not connected')
  // connect to postgres database using client credentials in const client
  client.connect();
  console.log('connected')

  //ADD INGREDIENT
  let addIngredient = async(userInput) => {
    const query = {
      text: `INSERT INTO RAW_ITEM VALUES ((SELECT MAX(RAW_ITEM_ID) + 1 FROM RAW_ITEM), 2, $1, $2, $3, $4, $5, $6)`,
      values: [
        userInput.ingredientName,
        userInput.ingredientCategory,
        userInput.ingredientSupplier,
        userInput.ingredientInvoicePrice,
        userInput.ingredientInvoiceAmount,
        userInput.ingredientInvoiceUnit,
        // userInput.ingredientTargetUnit
      ]
    }
    return (
      await client
      .query(query)
      .then(res => res.rows)
      .catch(err => console.log(err))
    )
  }

  // ADD NEW USER
  let addUser = async(userInput) => {
    const query = {
      text: `INSERT INTO users VALUES ((SELECT MAX(user_id) + 1 FROM users), $1, $2, $3, $4)`,
      values: [
        userInput.newUserName,
        userInput.newUserPassword,
        userInput.newUserAge,
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
      text: `SELECT * FROM USER_INFO WHERE user_info_username=$1
      AND user_info_password = encode(encrypt(convert_to($2, 'utf8'), 'ENC_KEY', 'aes'), 'hex');`,
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

  // GET INGREDIENT
  let getIngredient = async () => {
    const query = {
      text: 'SELECT * FROM RAW_ITEM;',
    }
    return (
      await client
      .query(query)
      .then(res => res)
      .catch(err => console.log(err)))
  }

  let getSpecificIngredient = async (userInput) => {
    const query = {
      text: `SELECT * FROM RAW_ITEM WHERE RAW_ITEM_ID=$1;`,
      values: [
        userInput.itemId,
      ]
    }
    return (
      await client
      .query(query)
      .then(res => res)
      .catch(err => console.log(err)))
  }

  let deleteIngredient = async (userInput) => {
    const query = {
      text: `DELETE FROM raw_item WHERE raw_item_id = $1 AND inventory_id = 2;`,
      values: [
        userInput.ingredientId,
      ]
    }
    return (
      await client
      .query(query)
      .then(res => console.log(res))
      .catch(err => console.log(err)))
  }



  // export modules
  module.exports = {
    addUser,
    checkUser,
    addIngredient,
    deleteIngredient,
    getIngredient,
    getSpecificIngredient
  }
