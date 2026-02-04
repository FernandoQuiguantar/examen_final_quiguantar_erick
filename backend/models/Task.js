const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [3, 255] } // Mínimo 3 caracteres
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'DONE'),
        allowNull: false,
        defaultValue: 'PENDING'
    }
});

module.exports = Task;