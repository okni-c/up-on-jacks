import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css';
import Home from './pages/home';
import Userprofile from './pages/userprofile';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';


// ReactDOM.render(
//   <React.StrictMode>
//     <Userprofile />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals(sendToVercelAnalytics);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/user">
          <Userprofile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);