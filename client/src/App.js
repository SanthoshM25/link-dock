import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import Home from "./components/home/Home";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import "react-toastify/dist/ReactToastify.css";
import Links from "./components/links/Links";

function App() {
  return (
    <div className="bg-main">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Signin} />
          <Route path="/:id" component={Links} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
