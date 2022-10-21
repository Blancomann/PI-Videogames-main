const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');
const axios = require('axios')
const {API_KEY} = process.env;

const videogamesRouter = Router();
/* 
insert into videogames (name, description, released, rating, platforms)
values ('MagnoKiller', 'omosho', '12-03-2020', 100, 'todo terreno');
*/
videogamesRouter.get('/', async(req, res) => {
  let dbGames = await Videogame.findAll({
    include: Genre
  });
  dbGames = JSON.stringify(dbGames);
  dbGames = JSON.parse(dbGames);

  dbGames = dbGames.reduce((acc, el) => acc.concat({
    ...el,
    genres: el.genres.map(g => g.name)
}), [])

  if(req.query.name){
    try{
      //busco en API
      const apiData = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}`);
      if(apiData.data.count === 0){
        console.log(`Not found: ${req.query.name}`);
        return res.status(404).json({'Not found': req.query.name});
      }
      const loadedGames = apiData.data.results.map((g) => {
        return{
          id: g.id,
          name: g.name,
          background_image: g.background_image,
          rating : g.rating,
          genres: g.genres.map((ge) => ge.name)
        }
      });
      //busco en DB
      const dbFiltered = dbGames.filter((g) => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
      const results = [...dbFiltered, ...loadedGames.splice(0, 10)];
      return res.json(results);
    }catch(e){
      console.log(e);
    }
  }else{//muestro todos los juegos
    try{
      let pages = 0;
      let results = [...dbGames];
      let apiData = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
      while(pages <= 4){
        pages++;
        let loadedGames = apiData.data.results.map((g) => {
          return{
            id: g.id,
            name: g.name,
            background_image: g.background_image,
            rating : g.rating,
            genres: g.genres.map((ge) => ge.name)
          }
        });
        results = [...results, ...loadedGames];
        apiData = await axios.get(apiData.data.next);
      }
      return res.json(results);
    }catch(e){
      console.log(e);
    }
  }



})

module.exports = videogamesRouter;