const { Router } = require('express');
const axios = require('axios')
const { Videogame, Genre } = require('../db.js');
// const { Videogame, Genre } = sequelize.models
// const { API_KEY } = process.env;
const {API_KEY} = require("../../config.js");

const videogameRouter = Router();
/*
insert into videogames (name, description, released, rating, platforms)
values ('MagnoKiller', 'omosho', '12-03-2020', 100, 'todo terreno');
*/

videogameRouter.get('/:idVideogame', async(req, res) => {
  const { idVideogame } = req.params;

  if(idVideogame.includes('-')){
    let dbGame = await Videogame.findOne({
      where:{
        id: idVideogame,
      },
      include:{
        model: Genre
      }
    });

    // res.json(dbGame)
    dbGame = JSON.stringify(dbGame);
    dbGame = JSON.parse(dbGame);
    // console.log(dbGame);
    
    // res.json(dbGame)
    dbGame.genres = dbGame.genres.map(g => g.name);
    res.json(dbGame)

    // const game = dbData.map((g) => ({
    //   id: g.id, 
    //   name: g.name, 
    //   genres: g.genres, 
    //   description: g.description, 
    //   released: g.released, 
    //   rating: g.rating, 
    //   platforms: g.platforms
    // }))

  }else{
    try{
      const apiData = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
      // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA =====>' + idVideogame);
      let { id, name, background_image, genres, description, released, rating, platforms } = apiData.data;
      platforms = platforms.map((p) => p.platform.name);
      genres = genres.map((ge) => ge.name);
      return res.status(200).json({
        id, 
        name, 
        background_image, 
        genres, 
        description, 
        released, 
        rating, 
        platforms
      })
    }catch(e){
      console.log(e);
      return(e);
    }
  }
});

videogameRouter.post('/', async(req, res) => {
  let { name, description, released, rating, genres, platforms } = req.body;
  platforms = platforms.join(', ');
  // console.log('!!!SOS!!!' + platforms);

  try{
    const gameCreated = await Videogame.findOrCreate({
      where:{
        name,
        description,
        released,
        rating,
        platforms,
      }
    });

    if(genres.length){
      genres.map(async(ge) => {       //.split(', ') is not a function ==> lo saqué, revisar posibles errores
        let genre = await Genre.findOrCreate({where: {name: ge}});
        gameCreated[0].addGenre(genre[0]);
      })
    }
  res.status(200).send(gameCreated)
  }catch(e){
    console.log(e);
  }

})



module.exports = videogameRouter;