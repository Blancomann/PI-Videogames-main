const { Router } = require('express');
const genreRouter = require('./genresR');
const videogameRouter = require('./videogameR');
const videogamesRouter = require('./videogamesR');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.use('/videogame', videogameRouter);
mainRouter.use('/videogames', videogamesRouter);
mainRouter.use('/genres', genreRouter);


module.exports = mainRouter;
