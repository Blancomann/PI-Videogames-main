import React, { useState } from "react";
import NavBar from '../NavBar/NavBar.jsx';
import s from './createGame.module.css'
import axios from 'axios';


const CreateGame = (props) => {

  const [errors, setErrors] = useState({  form: 'Must complete the form'  });

  const [form, setForm] = useState({
    name: '',
    description: '',
    released: '',
    rating: 0,
    genres: [],
    platforms: []
  });

  //________________________________________________REVISAR E.TARGET.PARENTNODE 
  const handleChange = (e) => {
    //GENRES
    if(e.target.parentNode.parentNode.id === 'genres'){
      if(e.target.checked){
        console.log(e);//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        setForm((prevState) => ({
          ...prevState,
          genres: form.genres.concat(e.target.name)//e.target.value
        }))
      }else{
        setForm((prevState) => ({
          ...prevState,
          genres: form.genres.filter((g) => e.target.name !== g)//e.target.value
        }))
      }
    }
    //PLATFORMS
    if(e.target.parentNode.parentNode.id === 'platforms'){
      if(e.target.checked){
        console.log(e);//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        setForm((prevState) => ({
          ...prevState,
          platforms: form.platforms.concat(e.target.name)
        }))
      }else{
        setForm((prevState) => ({
          ...prevState,
          platforms: form.platforms.filter((p) => e.target.name !== p)
        }))
      }
    }
    //NAME, DESCRIPTION, RELEASE, RATING
    if(e.target.type !== 'checkbox'){
      setForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

    //ERRORS ________________________________________________________________________REVISAR
    setErrors(validate({
      ...form,
      [e.target.name]: e.target.value
    }))
  }

  const validate = (form) => {
    let errors = {};

    if(!form.name){
      errors.name = 'Game name is required';
    }else if(form.name.length < 4){
      errors.name = 'Game name must have at least 4 characters';
    }

    if(!form.description){
      errors.description = 'Description is required';
    }else if(form.description.length < 8){
      errors.description = 'Description must have at least 8 characters';
    }

    if(!form.rating){
      errors.rating = 'Rating is required';
    }else if(form.rating > 5 || form.rating < 1){
      errors.rating = 'Rating must be between 1 and 5'
    }

    return errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(form);
    let checkboxErrors = [];
    if(form.genres.length < 1){checkboxErrors.push('At least 1 game genre is required')};
    if(form.platforms.length < 1){checkboxErrors.push('At least 1 gaming platform is required')};
    if(Object.values(errors).length || checkboxErrors.length){
      return alert(Object.values(errors).concat(checkboxErrors).join('\n'));
    };
    axios.post(`http://localhost:3001/videogame`, form)
      .then((res) => console.log(res.data));
    alert(`${form.name} has been created!`)
    props.history.push('/videogames'); //Añade al historial
  }

  return(
    <div className={s.mainContainer}>
      <NavBar />
      <div className={s.container}>
        <h2>CREATE GAME!!</h2>
        <div className={s.formDiv}>
          <form onSubmit={handleSubmit} onChange={handleChange} >
            <label htmlFor="name" className={s.titleName}><strong>Name: </strong></label><br/>
            <input type="text" className={s.name} placeholder="Name.." id="name" name="name" autoComplete="off" /><br/>

            <label htmlFor="description" className={s.titleName}><strong>Description: </strong></label><br/>
            <textarea className={s.name} name="description" placeholder="Description.." id="description" cols='30' rows='3' /><br/>

            <label htmlFor="date" className={s.titleName}><strong>Release date: </strong></label><br/>
            <input type="date" name="released" className={s.dt} id="date" required /><br/>
            {/* {console.log('SOS' + typeof form.released)} */}

            <label htmlFor="rating" className={s.titleName}><strong>Rating: </strong></label><br/>
            <input type="number" min='0' max='5' name="rating" className={s.dt} placeholder="Rate from 1 to 5" id="rating" autoComplete="off" /><br/>

            <label className={s.titleName}><strong>Genres: </strong></label><br/>
            <div id="genres" className={s.genresDiv}>
              <div>
                <input name="Action" value="1" id="Action" type="checkbox" />
                <label htmlFor="Action">Action</label>
              </div>
              <div>
                <input name="Indie" value="2" id="Indie" type="checkbox" />
                <label htmlFor="Indie">Indie</label>
              </div>
              <div>
                <input name="Adventure" value="3" id="Adventure" type="checkbox" />
                <label htmlFor="Adventure">Adventure</label>
              </div>
              <div>
                <input name="RPG" value="4" id="RPG" type="checkbox" />
                <label htmlFor="RPG">RPG</label>
              </div>
              <div>
                <input name="Strategy" value="5" id="Strategy" type="checkbox" />
                <label htmlFor="Strategy">Strategy</label>
              </div>
              <div>
                <input name="Shooter" value="6" id="Shooter" type="checkbox" />
                <label htmlFor="Shooter">Shooter</label>
              </div>
              <div>
                <input name="Casual" value="7" id="Casual" type="checkbox" />
                <label htmlFor="Casual">Casual</label>
              </div>
              <div>
                <input name="Simulation" value="8" id="Simulation" type="checkbox" />
                <label htmlFor="Simulation">Simulation</label>
              </div>
              <div>
                <input name="Puzzle" value="9" id="Puzzle" type="checkbox" />
                <label htmlFor="Puzzle">Puzzle</label>
              </div>
              <div>
                <input name="Arcade" value="10" id="Arcade" type="checkbox" />
                <label htmlFor="Arcade">Arcade</label>
              </div>
              <div>
                <input name="Platformer" value="11" id="Platformer" type="checkbox" />
                <label htmlFor="Platformer">Platformer</label>
              </div>
              <div>
                <input name="Racing" value="12" id="Racing" type="checkbox" />
                <label htmlFor="Racing">Racing</label>
              </div>
              <div>
                <input name="Massively-Multiplayer" value="13" id="Massively-Multiplayer" type="checkbox" />
                <label htmlFor="Massively-Multiplayer">Massively Multiplayer</label>
              </div>
              <div>
                <input name="Sports" value="14" id="Sports" type="checkbox" />
                <label htmlFor="Sports">Sports</label>
              </div>
              <div>
                <input name="Fighting" value="15" id="Fighting" type="checkbox" />
                <label htmlFor="Fighting">Fighting</label>
              </div>
              <div>
                <input name="Family" value="16" id="Family" type="checkbox" />
                <label htmlFor="Family">Family</label>
              </div>
              <div>
                <input name="Board-Games" value="17" id="Board-Games" type="checkbox" />
                <label htmlFor="Board-Games">Board Games</label>
              </div>
              <div>
                <input name="Educational" value="18" id="Educational" type="checkbox" />
                <label htmlFor="Educational">Educational</label>
              </div>
              <div>
                <input name="Card" value="19" id="Card" type="checkbox" />
                <label htmlFor="Card">Card</label>
              </div>
            </div>
            <br/>

            <label className={s.titleName}><strong>Platforms: </strong></label><br/>
            <div id="platforms" className={s.platfromsDiv}>
              <div>
                <input name="PC" id="PC" type="checkbox" />
                <label htmlFor="PC">PC</label>
              </div>
              <div>
                <input name="PlayStation4" id="PlayStation4" type="checkbox" />
                <label htmlFor="PlayStation4">PlayStation 4</label>
              </div>
              <div>
                <input name="PlayStation5" id="PlayStation5" type="checkbox" />
                <label htmlFor="PlayStation5">PlayStation 5</label>
              </div>
              <div>
                <input name="XBOX" id="XBOX" type="checkbox" />
                <label htmlFor="XBOX">XBOX</label>
              </div>
              <div>
                <input name="PS-Vita" id="PS-Vita" type="checkbox" />
                <label htmlFor="PS-Vita">PS Vita</label>
              </div>
              <div>
                <input name="iOS" id="iOS" type="checkbox" />
                <label htmlFor="iOS">iOS</label>
              </div>
              <div>
                <input name="Android" id="Android" type="checkbox" />
                <label htmlFor="Android">Android</label>
              </div>
              <div>
                <input name="macOS" id="macOS" type="checkbox" />
                <label htmlFor="macOS">macOS</label>
              </div>
            </div>
            <br/>

            <div className={s.btnDiv}>
              <button type="submit">CREATE</button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
};

export default CreateGame;