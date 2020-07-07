import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import QuestionsBlock from './components/QuestionsBlock';
import FinalPage from './components/FinalPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="header" />
          <div className="content">
            <Switch>
              <Route exact path="/" component={QuestionsBlock} />
              <Route exact path="/secondpage" component={QuestionsBlock} />
              <Route exact path="/finalpage" component={FinalPage} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
