# Examen Final - Desarrollo Web (CRUD Full-Stack)

**Autor:** Erick Quiguantar  
**Institución:** PUCE  

Este proyecto es una aplicación web completa para la administración de tareas (Tasks), construida con una arquitectura de capas en el backend y componentes reutilizables en el frontend.

---

## Tecnologías Utilizadas

### Backend
* **Node.js & Express**: Servidor de aplicaciones.
* **Sequelize**: ORM para la gestión de la base de datos.
* **PostgreSQL**: Base de datos relacional.
* **Docker Compose**: Contenedorización de la base de datos.

### Frontend
* **React**: Biblioteca para la interfaz de usuario.
* **Tailwind CSS**: Framework de estilos para un diseño moderno.
* **Vite**: Herramienta de construcción rápida.

---

## Requisitos Previos
* Tener instalado **Docker Desktop**.
* Tener instalado **Node.js** (versión 18 o superior).
* Tener instalado **Git**.

---

## Pasos para levantar el proyecto

### 1. Base de Datos (Docker)
Desde la raíz del proyecto, ejecuta el siguiente comando para levantar el contenedor de PostgreSQL:
docker-compose up -d

### 2. BACKEND
* cd backend
* npm install
* node app.js

### 3. FRONTEND
* cd frontend
* npm install
* npm run dev

   



