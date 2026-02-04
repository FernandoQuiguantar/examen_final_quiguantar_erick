const Task = require('../models/Task');

const findAll = () => Task.findAll();
const findById = (id) => Task.findByPk(id);
const create = (data) => Task.create(data);
const update = async (id, data) => {
    const task = await Task.findByPk(id);
    if (task) return task.update(data);
    return null;
};
const destroy = async (id) => {
    const task = await Task.findByPk(id);
    if (task) return task.destroy();
    return null;
};

module.exports = { findAll, findById, create, update, destroy };