const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');
const axios = require('axios')
const {API_KEY} = process.env;
// const {API_KEY} = require("../../config.js");

const videogamesRouter = Router();
/* 
insert into videogames (name, description, released, rating, platforms)
values ('MagnoKiller', 'omosho', '12-03-2020', 100, 'todo terreno');
*/

const helpFunction = (page) => {
  let info = page.data.results;
  return info.map((g) => {
    return{
      id: g.id,
      name: g.name,
      background_image: g.background_image,
      rating : g.rating,
      genres: g.genres.map((ge) => ge.name)
    }
  })
}

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

// console.log(dbGames);

  if(req.query.name){
    try{
      //busco en API
      const apiData = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}`, { headers: { "Accept-Encoding": "gzip,deflate,compress" },});
      if(apiData.data.count === 0){
        console.log(`Not found: ${req.query.name}`);
        return res.status(204).json(`Not found: "${req.query.name}"`);
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
      const results = [...dbFiltered, ...loadedGames.splice(0, 15)];
      return res.status(200).json(results);
    }catch(e){
      console.log(e);
    }
  }else{//muestro todos los juegos
    try{
      let results = [...dbGames];
//  HARDCODEAR PRIMERAS PAGINAS Y ELIMINAR BUCLES FOR Y WHILE
      const page1 = await axios.get('https://api.rawg.io/api/games?key=19ffbe207bf84c358063377e656fbf27&page=1', { headers: { "Accept-Encoding": "gzip,deflate,compress" }});
      const page2 = await axios.get('https://api.rawg.io/api/games?key=19ffbe207bf84c358063377e656fbf27&page=2', { headers: { "Accept-Encoding": "gzip,deflate,compress" }});
      const page3 = await axios.get('https://api.rawg.io/api/games?key=19ffbe207bf84c358063377e656fbf27&page=3', { headers: { "Accept-Encoding": "gzip,deflate,compress" }});
      const page4 = await axios.get('https://api.rawg.io/api/games?key=19ffbe207bf84c358063377e656fbf27&page=4', { headers: { "Accept-Encoding": "gzip,deflate,compress" }});
      const page5 = await axios.get('https://api.rawg.io/api/games?key=19ffbe207bf84c358063377e656fbf27&page=5', { headers: { "Accept-Encoding": "gzip,deflate,compress" }});
      const page6 = await axios.get('https://api.rawg.io/api/games?key=19ffbe207bf84c358063377e656fbf27&page=6', { headers: { "Accept-Encoding": "gzip,deflate,compress" }});
      results = [...results, ...helpFunction(page1), ...helpFunction(page2), ...helpFunction(page3), ...helpFunction(page4), ...helpFunction(page5), ...helpFunction(page6)];




// console.log(aux);


      // let pages = 4;
      // let results = [...dbGames];
      // let apiData = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, { headers: { "Accept-Encoding": "gzip,deflate,compress" },});
      // // while(pages <= 4){
      //   // pages++;
      // for(let i = 0 ; i <= pages ; i++){
      //   let loadedGames = apiData.data.results.map((g) => {
      //     return{
      //       id: g.id,
      //       name: g.name,
      //       background_image: g.background_image,
      //       rating : g.rating,
      //       genres: g.genres.map((ge) => ge.name)
      //     }
      //   });
      //   results = [...results, ...loadedGames];
      //   apiData = await axios.get(apiData.data.next);
      // }
      return res.status(200).json(results);
    }catch(e){
      console.log(e);
    }
  }



})

module.exports = videogamesRouter;