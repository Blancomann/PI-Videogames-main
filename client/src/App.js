import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Videogames from './components/Videogames/Videogames';
import GameDetails from './components/GameDetails/GameDetails';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import CreateGame from './components/CreateGame/CreateGame';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/videogames' component={Videogames} />
        <Route exact path='/about' component={About} />
        <Route exact path='/videogame/:idVideogame' component={GameDetails} />
        <Route exact path='/createGame' component={CreateGame} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
