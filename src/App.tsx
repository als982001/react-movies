import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import SearchProto from "./Routes/SearchProto";
import Search from "./Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/tv", "/tv/:tvId"]}>
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
