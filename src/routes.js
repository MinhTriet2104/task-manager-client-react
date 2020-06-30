import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./components/dashboard";
import About from "./components/about";

import reducer from "./reducers/index";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const IndexPage = () => {
  return (
    <div>
      Welcome to Scrum Master
      <br />
      <a href="/project/5eeeffb55fc9ef2268b7c047">Homepage</a>
    </div>
  );
};

const NotFoundPage = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <br />
      <a href="/project/5eeeffb55fc9ef2268b7c047">Homepage</a>
    </div>
  );
};

export default (
  <Provider store={store}>
    <Router>
      <Route path="/project/:id" exact component={App} />
      <Route path="/about" exact component={About} />
      <Route exact path="/" component={IndexPage} />
      <Route path="*" exact component={NotFoundPage} />
    </Router>
  </Provider>
);
