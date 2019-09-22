import * as React from 'react';
import { Notes } from "./components/index"
// import { Grid } from "@material-ui/core"
// import { withStyles } from '@material-ui/styles';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";


export class App extends React.Component<any, any> {
  render() {
    return (
      <Router>
        <Redirect from="/" to="/notes"/>
        <Switch>
          <Route path="/notes" component={Notes}/>
        </Switch>
      </Router>
    )
  }
}
