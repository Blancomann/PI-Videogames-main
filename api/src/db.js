require('pg')
require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

// let sequelize =
//   process.env.NODE_ENV === "production"
//     ? new Sequelize({
//         database: process.env.DB_NAME,
//         dialect: "postgres",
//         host: process.env.DB_HOST,
//         port: 5432,
//         username: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         pool: {
//           max: 3,
//           min: 1,
//           idle: 10000,
//         },
//         dialectOptions: {
//           ssl: {
//             require: true,
//             // Ref.: https://github.com/brianc/node-postgres/issues/2009
//             rejectUnauthorized: false,
//           },
//           keepAlive: true,
//         },
//         ssl: true,
//       })
//     : new Sequelize(
//         `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
//         { logging: false, native: false }
//       );

// const {PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT} = process.env;

// const sequelize = new Sequelize(`postgresql://${{ PGUSER }}:${{ PGPASSWORD }}@${{ PGHOST }}:${{ PGPORT }}/${{ PGDATABASE }}`, {
const sequelize = new Sequelize(`postgresql://postgres:ljnOkRyAYx3b5j8FkNeo@containers-us-west-156.railway.app:6044/railway`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
})

// const sequelize = new Sequelize(`postgresql://postgres:0Sxr5aMs44g7LTncOd9M@containers-us-west-158.railway.app:5580/railway`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genre } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Videogame.belongsToMany(Genre, {
  through: "videogamegenre",
  timestamps: false,
});
Genre.belongsToMany(Videogame, {
  through: "videogamegenre",
  timestamps: false,
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
