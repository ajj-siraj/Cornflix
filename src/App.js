//Main modules or 3rd party
import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ScrollLock, { TouchScrollable } from "react-scrolllock";

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
import Watch from "./components/pages/Watch";

//config
import * as Actions from "./redux/Actions";

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
import "./css/UserAccount.css";
import "./css/News.css";

const mapStateToProps = (state) => {
  return {
    user: state.loginStatus || state.validateStatus,
    isLoading: state.loadingStatus.isLoading,
    tab: state.tab,
    data: { ...state.data },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(Actions.loginUser(user)),
    logoutUser: () => dispatch(Actions.logoutUser()),
    loadingComplete: () => dispatch(Actions.loadingComplete()),
    validateUser: () => dispatch(Actions.validateUser()),
    trackTab: (tab) => dispatch(Actions.trackTab(tab)),
    fetchNews: () => dispatch(Actions.fetchNews()),
    fetchTop: () => dispatch(Actions.fetchTop()),
    fetchLatest: () => dispatch(Actions.fetchLatest()),
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

    this.props.fetchNews();
    this.props.fetchTop();
    this.props.fetchLatest();

    // this.setState((prevState) => ({ ...prevState }));
  }

  render() {
    return (
      <div className="App">
        <ScrollLock isActive={this.props.isLoading} />
        {this.props.isLoading ? <Loading /> : null}
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
                topMovies={this.props.data.topMovies}
                latestMovies={this.props.data.latestMovies}
                news={this.props.data.news}
              />
            )}
          />

          <Route
            exact
            path="/movies"
            component={() => <Movies topMovies={this.props.data.topMovies} />}
          />

          <Route
            path="/watch/:movieid"
            component={(match) => (
              <Watch user={this.props.user} match={match} data={this.props.data} />
            )}
          />
          <Route
            path="/movies/:movieid"
            render={(match) => (
              <MovieDetails
                match={match}
                topMovies={this.props.data.topMovies}
                latestMovies={this.props.data.latestMovies}
                user={this.props.user}
                validateUser={this.props.validateUser}
              />
            )}
          />

          <Route
            path="/explore"
            component={() => <ExploreMovies movies={this.props.data.topMovies} />}
          />

          <Route
            path="/login"
            component={() => <Login user={this.props.user} loginUser={this.props.loginUser} />}
          />

          <Route
            path="/recoverpw"
            component={(match) => <RecoverPass match={match} user={this.props.user} />}
          />

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

        <Route path="/" component={Footer} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
