import React from "react";
import ReactDOM from "react-dom";
// import { createStore } from "redux";
// import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";

import routes from "./routes";
// import reducer from "./reducers/index";

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById("root")
);
