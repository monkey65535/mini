const Sequelize = require('sequelize')
const {
    host,
    user,
    password,
    port,
    dbName
} = global.config.database;

console.log(host, user, password, port, dbName);
const sequelize = new Sequelize(dbName, user, password, {
    dialect:"mysql",
    
})