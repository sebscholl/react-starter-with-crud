import React from 'react';
import { ProtectedRoute } from 'shared/components';
import { Redirect, Route, Switch } from 'react-router-dom';

/* Import UI Components */
import { NavBar } from '../components';

/* Import Route Components */
import Home from './home';
import CrudExample from './crud';
import AuthCallback from './auth';

export default class Router extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/auth" component={AuthCallback} />
        <Route>
          <div>
            <NavBar />
            
            <hr />

            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <ProtectedRoute exact path="/crud" component={CrudExample} />
                <Redirect to="/" />
              </Switch>
            </div>
          </div>
        </Route>
      </Switch>
    );
  }
}
