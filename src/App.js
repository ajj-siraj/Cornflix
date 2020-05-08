//Main modules or 3rd party
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//App components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import MovieDetails from "./components/MovieDetails";
import Movies from "./components/Movies";
import ExploreMovies from "./components/ExploreMovies";
import Login from "./components/Login";
import Signup from "./components/Signup";

//other
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "./css/App.css";
import "./css/Header.css";
import "./css/Footer.css";
import "./css/FeaturedMovies.css";
import "./css/LatestMovies.css";
import "./css/ExploreMovies.css";
import "./css/Login.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      user: {
        isLoggedIn: true,
      },
    };
  }

  componentDidMount() {
    //Used imdb-api to retrieve top movies list
    // const imdbAPI = "https://imdb-api.com/en/API/Top250Movies/k_39DL92RX";
    const apiServer = "http://localhost:4000/movies?_limit=10";

    fetch(apiServer)
      .then((response) => response.json())
      .then((res) => this.setState({ movies: res }))
      .then(() => console.log(this.state.movies))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header user={this.state.user}/>
          <Switch>
            <Route exact path="/" component={() => <Main movies={this.state.movies} />} />
            <Route exact path="/movies" component={() => <Movies movies={this.state.movies} />} />
            <Route
              path="/movies/:movieid"
              render={(match) => <MovieDetails match={match} movies={this.state.movies} />}
            />
            <Route path="/explore" component={() => <ExploreMovies movies={this.state.movies} />} />
            <Route path="/login" component={() => <Login user={this.state.user} />} />
            <Route path="/signup" component={() => <Signup user={this.state.user} />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
