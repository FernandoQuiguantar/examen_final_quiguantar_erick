const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tasks_db', 'user_p', 'password_p', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false // Para no llenar la consola de logs de SQL
});

module.exports = sequelize;