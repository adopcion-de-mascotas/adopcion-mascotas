const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const logger = require("morgan")
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();

/* Routes */
const indexRouter = require('./routes/indexRouter');

/* Views config */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

/* Middlewares */
app.use(express.static(path.join(__dirname, '..public'))); // Ajusta la ruta según tu estructura
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(logger("dev"))

/* Routes */
app.use('/', indexRouter);

/* Error handlers */
app.use((req, res, next) => {
    res.status(404).render('not-found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error-server');
});

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}\nhttp://localhost:${PORT}`));