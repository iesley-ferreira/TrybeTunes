import React from "react";
import { Route, Switch } from "react-router-dom";
import Album from "./pages/Album";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import SearchComponentPage from "./pages/SearchComponentPage";

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/search' component={SearchComponentPage} />
      <Route exact path='/album/:id' component={Album} />
      <Route exact path='/favorites' component={Favorites} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/profile/edit' component={ProfileEdit} />
      <Route exact path='*' component={NotFound} />
    </Switch>
  );
};

export default App;
