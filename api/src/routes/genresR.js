const axios = require('axios');
const { Router } = require('express');
const { Genre } = require('../db.js');
const {API_KEY} = process.env;
// const {API_KEY} = require("../../config.js");

const genreRouter = Router();

genreRouter.get('/', async(req, res) => {
  try{
    const apiData = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
    const genres = apiData.data.results;
    genres.forEach(async(g) => {
      await Genre.findOrCreate({
        where: {
          name: g.name,
        }
      })
    })

    const frontGenres = genres.map((g) => {
      return{
        id: g.id,
        name: g.name
      }
    })
    // console.log(frontGenres.length);
    res.status(200).send(frontGenres);
  }catch(e){
    console.log(e);
  }
})




module.exports = genreRouter;