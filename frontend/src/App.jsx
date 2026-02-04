import { useState, useEffect } from 'react';
import { MyButton } from './components/MyButton';
import { MyInput } from './components/MyInput';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', description: '', status: 'PENDING' });

  const API_URL = 'http://localhost:3000/api/tasks';

  // 1. Obtener tareas (GET)
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error cargando tareas:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Crear o Guardar tarea (POST)
  const handleSave = async () => {
    setError(''); // Limpiar errores previos
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        // Aquí mostramos el error 400 del backend (regla de los 10 caracteres)
        setError(data.message);
      } else {
        // Éxito: limpiar formulario y recargar lista
        setForm({ title: '', description: '', status: 'PENDING' });
        fetchTasks();
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor. Verifica que el backend esté corriendo.");
    }
  };

  // 3. Eliminar tarea (DELETE) con confirmación
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTasks();
      } catch (err) {
        setError("Error al eliminar la tarea.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-blue-800">Examen Final - Task Manager</h1>
          <p className="text-gray-500 italic">Erick Quiguantar</p>
        </header>

        {/* Sección de Mensajes de Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm animate-pulse">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        {/* Formulario de Tareas */}
        <section className="bg-blue-50 p-6 rounded-xl mb-8 space-y-4">
          <MyInput 
            label="Título de la Tarea" 
            value={form.title} 
            onChange={(e) => setForm({...form, title: e.target.value})}
            placeholder="Mínimo 3 caracteres"
          />
          
          <MyInput 
            label="Descripción" 
            value={form.description} 
            onChange={(e) => setForm({...form, description: e.target.value})}
            placeholder="Debe ser +10 caracteres"
          />

          <div className="flex flex-col mb-4">
            <label className="text-sm font-bold text-gray-700 mb-1">Estado</label>
            <select 
              className="w-full p-2 border-2 border-gray-200 rounded-lg bg-white focus:border-blue-500 outline-none"
              value={form.status} 
              onChange={(e) => setForm({...form, status: e.target.value})}
            >
              <option value="PENDING">PENDIENTE</option>
              <option value="IN_PROGRESS">EN PROCESO</option>
              <option value="DONE">TERMINADO</option>
            </select>
          </div>

          <MyButton onClick={handleSave} variant="primary">
            Guardar Tarea
          </MyButton>
        </section>

        {/* Listado de Tareas */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-700 mb-4 italic">Lista de Tareas Registradas</h2>
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400 py-10">No hay tareas creadas todavía.</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="flex justify-between items-center p-5 bg-white border-2 border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex-1 mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">{task.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      task.status === 'DONE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{task.description || "Sin descripción"}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <MyButton onClick={() => handleDelete(task.id)} variant="danger">
                    Eliminar
                  </MyButton>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default App;