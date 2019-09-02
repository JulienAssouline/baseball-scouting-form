import React, {useState} from 'react';
import './App.css';
import apolloClient from "./apolloClient"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ApolloProvider } from 'react-apollo';
import HittingProspectForm from "./components/HittingProspectForm"
import PitchingProspectForm from "./components/PitchingProspectForm"
import ScoutingReports from "./components/ScoutingReports"

import {Button} from '@material-ui/core'


function App(props) {

  // const [variant, setVariant] = useState("")

  return (
    <ApolloProvider client = {apolloClient}> 
      <div className="App">
      <Router>
        <div className = "button-container">
          <Link to={`/`}>
            <Button variant="contained" color="primary">Hitters</Button>
          </Link>
          <Link to={`/pitching`}>
            <Button variant="outlined" color="primary">Pitchers</Button>
          </Link>
          <Link to={`/reports`}>
            <Button variant="outlined" color="primary">Reports</Button>
          </Link>
        </div>
            <Route path="/" exact component = {HittingProspectForm} />
            <Route path="/pitching" exact component = {PitchingProspectForm} />
            <Route path="/reports" exact component = {ScoutingReports} />
          </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
