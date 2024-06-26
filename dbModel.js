const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//get user from database
const getUser = async (platform, id) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(`SELECT * FROM users WHERE ${platform} = ${id}::text`, (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
} 

//get user from database
const createUser = async (platform, id, email) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(`INSERT INTO users (email, ${platform}) VALUES ('${email}', ${id}::text) RETURNING *`, (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });

      // pool.query("INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *",
      //   [name, email],
      //   (error, results) => {
      //     if (error) {
      //       reject(error);
      //     }
      //     if (results && results.rows) {
      //       resolve(`A new user has been created: ${JSON.stringify(results.rows[0])}`);
      //     } else {
      //       reject(new Error("No results found"));
      //     }
      //   }
      // );

    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
} 

// const currentUserQuery = await dbClient.query("SELECT * FROM users WHERE googleId = $1", [userData.sub]);
    //   if(currentUserQuery.rows.length > 0){
    //     user = {
    //       given_name: userData.given_name,
    //       picture: userData.picture,
    //       is_new_user: false,
    //     };
    //   }

//get all stages from the database
const getStages = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM fire_stages", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

// //create a new merchant record in the databsse
// const createMerchant = (body) => {
//   return new Promise(function (resolve, reject) {
//     const { name, email } = body;
//     pool.query(
//       "INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *",
//       [name, email],
//       (error, results) => {
//         if (error) {
//           reject(error);
//         }
//         if (results && results.rows) {
//           resolve(
//             `A new merchant has been added: ${JSON.stringify(results.rows[0])}`
//           );
//         } else {
//           reject(new Error("No results found"));
//         }
//       }
//     );
//   });
// };
// //delete a merchant
// const deleteMerchant = (id) => {
//   return new Promise(function (resolve, reject) {
//     pool.query(
//       "DELETE FROM merchants WHERE id = $1",
//       [id],
//       (error, results) => {
//         if (error) {
//           reject(error);
//         }
//         resolve(`Merchant deleted with ID: ${id}`);
//       }
//     );
//   });
// };
// //update a merchant record
// const updateMerchant = (id, body) => {
//   return new Promise(function (resolve, reject) {
//     const { name, email } = body;
//     pool.query(
//       "UPDATE merchants SET name = $1, email = $2 WHERE id = $3 RETURNING *",
//       [name, email, id],
//       (error, results) => {
//         if (error) {
//           reject(error);
//         }
//         if (results && results.rows) {
//           resolve(`Merchant updated: ${JSON.stringify(results.rows[0])}`);
//         } else {
//           reject(new Error("No results found"));
//         }
//       }
//     );
//   });
// };
module.exports = {
  getStages,
  getUser,
  createUser,
};