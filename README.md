# 🐾 Proyecto MVP - Adopción de Mascotas | Cohorte 2025

## 📌 Descripción
Plataforma web para facilitar la adopción responsable de mascotas, conectando con adoptantes potenciales.

## 👥 Equipo
**Mentor:** Wilson Ariza Zambrano  
**Desarrolladores:**
- Ayelén Elisabet Cayuqueo
- Luciano Melgar
- Hernán Parma
- Pedro Morgade
- Paulo Giménez
- Brian Flores
- Nahuel Argandoña
- Laura Yachelini
- Andrés Corvalán

## 🗓️ Cronograma
| Fecha           | Hito |
|-----------------|------|
| 22/04/2025     | Kickoff del proyecto |
| 24/04/2025     | Selección definitiva del proyecto |
| 23/06/2025     | Entrega del MVP |
| 30/06/2025     | Presentación final |

## 💻 Stack Tecnológico
### Frontend
- HTML
- CSS
- Javascript
- Plantillas EJS

### Backend
- Node.js
- Express

### Base de Datos
- MySQL
- Sequelize (ORM)

### Herramientas
- GitHub (control de versiones)

---

## 🛠️ Configuración Inicial

### 📋 Requisitos Previos
- Node.js
- MySql
- Git

### 🔧 Pasos de Instalación

1. **Clonar repositorio**
```bash
git clone https://github.com/adopcion-de-mascotas/adopcion-mascotas.git
cd adopcion-mascotas
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Clonar repositorio**
- Copiar el archivo .env.example y crear el archivo .env
- Completar las variables segun corresponda:
```env
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
```

4. **Clonar repositorio**
```bash
npm run database    # Crear la base de datos
npm run migrate    # Ejecutar migraciones
npm run seed       # Poblar datos iniciales (opcional)
```

5. **Iniciar proyecto**
```bash
npm run dev
```