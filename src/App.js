//Main modules or 3rd party
import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Fade from "react-reveal/Fade";

//App components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import MovieDetails from "./components/MovieDetails";
import Movies from "./components/Movies";
import ExploreMovies from "./components/ExploreMovies";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import SearchResults from "./components/SearchResults";
import Loading from "./components/Loading";
import UserAccount from "./components/pages/UserAccount";
import RecoverPass from "./components/RecoverPass";
//config
import { apiServerBaseUrl } from "./config";
import * as Actions from "./redux/Actions";

//other

// import "../node_modules/animate.css/animate.min.css";
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
import "./css/UserAccount.css";

const mapStateToProps = (state) => {
  return {
    user: state.loginStatus || state.validateStatus,
    isLoading: state.loadingStatus.isLoading,
    tab: state.tab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(Actions.loginUser(user)),
    logoutUser: () => dispatch(Actions.logoutUser()),
    loadingComplete: () => dispatch(Actions.loadingComplete()),
    validateUser: () => dispatch(Actions.validateUser()),
    trackTab: (tab) => dispatch(Actions.trackTab(tab)),
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topMovies: [],
      latestMovies: [],
    };
  }

  componentDidMount() {
    this.props.validateUser();

    if (this.state.topMovies.length === 0) {
      axios
        .get(`${apiServerBaseUrl}/movies/top`, { withCredentials: true })
        .then((res) => {
          this.setState({ topMovies: res.data, latestMovies: res.data });
          this.props.loadingComplete();
        })
        .catch((err) => console.error(err));
      // fetch(`${apiServerBaseUrl}/movies/top`)
      //   .then((response) => response.json())
      //   .then((res) => this.setState({ topMovies: res }))
      //   .catch((err) => console.error(err));
    }

    // if (this.state.latestMovies.length === 0) {
    //   fetch(`${apiServerBaseUrl}/movies/top`)
    //     .then((response) => response.json())
    //     .then((res) => this.setState({ latestMovies: res }))
    //     .catch((err) => console.error(err));
    // }
  }

  render() {
    console.log("App.js props: ", this.props);
    if (this.props.isLoading) {
      return <Loading />;
    }
    return (
      <div className="App">
        {this.props.user.isLoggedIn ? <Redirect to="/" /> : null}
        <Route
          path="/"
          component={(history) => (
            <Header
              user={this.props.user}
              history={history}
              validateUser={this.props.validateUser}
            />
          )}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Main
                user={this.props.user}
                topMovies={this.state.topMovies}
                latestMovies={this.state.latestMovies}
              />
            )}
          />

          <Route
            exact
            path="/movies"
            component={() => <Movies topMovies={this.state.topMovies} />}
          />

          <Route
            path="/movies/:movieid"
            render={(match) => (
              <MovieDetails
                match={match}
                topMovies={this.state.topMovies}
                latestMovies={this.state.latestMovies}
                user={this.props.user}
                validateUser={this.props.validateUser}
              />
            )}
          />

          <Route
            path="/explore"
            component={() => <ExploreMovies movies={this.state.topMovies} />}
          />

          <Route
            path="/login"
            component={() => <Login user={this.props.user} loginUser={this.props.loginUser} />}
          />

          <Route path="/recoverpw" component={() => <RecoverPass user={this.props.user} />} />

          <Route
            path="/signup"
            component={(match) => (
              <Signup match={match} user={this.props.user} loginUser={this.props.loginUser} />
            )}
          />

          <Route
            path="/logout"
            component={(match) => (
              <Logout match={match} user={this.props.user} logoutUser={this.props.logoutUser} />
            )}
          />

          <Route exact path="/search" component={() => <SearchResults />} />
          <Route path="/search/:query" component={(match) => <SearchResults match={match} />} />
          <Route
            path="/account/:username"
            component={() => (
              <UserAccount
                user={this.props.user}
                validateUser={this.props.validateUser}
                trackTab={this.props.trackTab}
                tab={this.props.tab}
              />
            )}
          />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
