# 🐾 Proyecto MVP - Adopción de Mascotas | Cohorte 2025

## 📌 Descripción
Plataforma web para facilitar la adopción responsable de mascotas, conectando con adoptantes potenciales.

## 👥 Equipo
**Mentor:** Wilson Ariza Zambrano  
**Desarrolladores:**
- Ayelén Elisabet Cayuqueo
- Luciano Melgar
- Pedro Morgade
- Brian Flores
- Nahuel Argandoña

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
- React Js
- Tailwind CSS

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
- En la raíz de la carpeta adopción-mascotas
- y dentro de las carpetas frontend y server e instalar las dependencias
```bash
npm install
```

3. **Configurar variables de entorno**
- Copiar el archivo .env.example de la carpeta server y crear el archivo .env
- Completar las variables segun corresponda:
```env
PORT =
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
JWT_SECRET =
```

- En la carpeta frontend copiar el archivo .env.example y crear el archivo .env
- Completar las variables segun corresponda
```env
VITE_API_URL =
```

4. **Deploy base de datos**
- Dentro de la carpeta server ejecutar los siguientes comandos
- El gestor de MySQL debe estar corriendo previamente 

```bash
npm run database    # Crear la base de datos
npm run migrate    # Ejecutar migraciones
npm run seed       # Poblar datos iniciales (opcional)
```

5. **Iniciar proyecto**
- En la carpeta raíz del proyecto ejecutar
```bash
npm run dev
```