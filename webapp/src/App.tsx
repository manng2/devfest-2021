import React from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import routes from './routes';
import './assets/scss/font.scss';
import './App.scss';

function App() {
  return (
    <div className="App">
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossOrigin="anonymous"></link>
      </head>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => (
                  <route.component
                    name={route.name}
                    {...props}
                    {...route.props}
                  />
                )}
              >

              </Route>
            )
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
