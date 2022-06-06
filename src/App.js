import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import "./App.css";
import todosComp from "./components/todos/todosComp";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/todos" component={todosComp} />
        <Route exact path="/verify" component={VerifyEmail} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
