//Main modules
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//App components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

//Links & other
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import "./css/App.css";
import "./css/Footer.css";
import "./css/FeaturedMovies.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      tempMv: [
        {
          Title: "Temp Title",
        },
      ],
    };
  }

  componentDidMount() {
    //Used imdb-api to retrieve top movies list
    // const imdbAPI = "https://imdb-api.com/en/API/Top250Movies/k_39DL92RX";
    const apiServer = "http://localhost:4000/movies?_limit=10";

    fetch(apiServer)
      .then((response) => response.json())
      .then((res) => this.setState({ movies: res }))
      .then((res) => console.log(this.state.movies))
      .catch((err) => console.error("FIRST fetch failed!"));
  }

  render() {
    const Movies = () => {
      return <div>This is the Movies page</div>;
    };

    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            {/* <Main movies={this.state.movies} /> */}
            <Route exact path="/" component={() => <Main movies={this.state.movies}/>}/>
            <Route path="/movies" component={Movies} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
