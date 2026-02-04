const taskRepository = require('../repositories/taskRepository');

const getAllTasks = () => taskRepository.findAll();
const getTaskById = (id) => taskRepository.findById(id);

const createTask = async (data) => {
    // Regla obligatoria: No DONE si desc < 10
    if (data.status === 'DONE' && (!data.description || data.description.length < 10)) {
        throw { status: 400, message: "No se puede crear como DONE con descripción corta (mínimo 10)" };
    }
    return await taskRepository.create(data);
};

const updateTask = async (id, data) => {
    // Misma regla para actualizar
    if (data.status === 'DONE' && (!data.description || data.description.length < 10)) {
        throw { status: 400, message: "No se puede actualizar a DONE con descripción corta" };
    }
    return await taskRepository.update(id, data);
};

const deleteTask = (id) => taskRepository.destroy(id);

module.exports = { 
  getAllTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask 
};