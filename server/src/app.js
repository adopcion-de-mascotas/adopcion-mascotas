const express = require('express');
const logger = require("morgan");
const cors = require('cors');
const createError = require('http-errors')
require('dotenv').config();
const path = require("path")

const PORT = process.env.PORT || 4000;
const app = express();

/* Routes */
const indexRouter = require('./routes/indexRouter');


/* Middlewares */
app.use(cors())
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

/* Routes */
app.use('/api', indexRouter);

// Ruta no encontrada
app.use((req, res, next) => {
    next(createError(404, 'Ruta no encontrada'))
})


app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}\nhttp://localhost:${PORT}/api`));