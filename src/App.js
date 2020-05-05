import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./css/App.css";
import "./css/Footer.css";
import "./css/FeaturedMovies.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      tempMv: [{
        Title: "Temp Title"
      }],
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
    
    return (
      <div className="App">
        <Header movies={this.state.movies.length == 0 ? this.state.tempMv : this.state.movies}/>
        <Main movies={this.state.movies}/>
        <Footer />
      </div>
    );
  }
}

export default App;
