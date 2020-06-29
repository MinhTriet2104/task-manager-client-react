import React from "react";
import { Route } from "react-router";
import App from "./components/dashboard";
import About from "./components/about";

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
  <Route>
    <Route path="/project/:id" exact component={App} />
    <Route path="/about" exact component={About} />
    <Route exact path="/" component={IndexPage} />
    <Route path="*" exact component={NotFoundPage} />
  </Route>
);
