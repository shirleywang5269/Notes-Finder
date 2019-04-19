import React from "react";
import ReactDOM from "react-dom";
const Suspense = (React as any).Suspense;
import asyncComponent from "./AsyncComponent";
import Loading from "./components/Loading";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./index.css";
const Home = asyncComponent({ loader: () => import("./components/Home") });
const Notes = asyncComponent({ loader: () => import("./components/Notes") });
const new_notes = asyncComponent({ loader: () => import("./components/new_notes") });

const Routes = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Route path="/" exact component={Home as any} />
      <Route path="/patients/:id" component={Notes as any} />
      <Route path="/new" component={new_notes as any} />
    </Suspense>
  </Router>
);

ReactDOM.render(<Routes />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
