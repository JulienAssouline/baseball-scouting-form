import React from 'react';
import './App.css';
import apolloClient from "./apolloClient"
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from 'react-apollo';
import HittingProspectForm from "./components/HittingProspectForm"
import PitchingProspectForm from "./components/PitchingProspectForm"
import HittersScoutingReports from "./components/HittersScoutingReports"
import PitchersScoutingReports from "./components/PitchersScoutingReports"
import NavTabs from "./components/Nav"

function App(props) {

  return (
    <ApolloProvider client = {apolloClient}> 
      <div className="App">
      <Router>
        <div className = "button-container">
          <NavTabs />
        </div>
            <Route path="/" exact component = {HittingProspectForm} />
            <Route path="/pitching" component = {PitchingProspectForm} />
            <Route path="/hitters/reports" component = {HittersScoutingReports} />
            <Route path="/pitchers/reports" component = {PitchersScoutingReports} />
          </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
