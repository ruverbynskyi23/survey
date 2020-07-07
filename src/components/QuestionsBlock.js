import React from 'react';
import {Switch, Route} from 'react-router-dom';
import FirstPage from './questions_pages/FirstPage';
import SecondPage from './questions_pages/SecondPage';
import axios from 'axios';
import './QuestonsBlock.css';

class QuestonsBlock extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userData: [],
    };
  }

  async sendData() {
    const {userData} = this.state;
    console.log('Data was send');
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        postedData: userData,
      });
      console.log('response', response);
    } catch(e) {
      console.log('Error', e);
    }
  }

  saveUserData(data) {
    const {userData} = this.state;
    userData.push(data);
  }

  render() {
    return (
      <div className="main-block">
        <h1 className="title">Физическая активность</h1>
        <span className="subtitle">Здравствуйте, потратьте пожалуйста, несколько минут своего времени на заполнение следующей анкеты.</span>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <FirstPage
                {...props}
                saveInfo={this.saveUserData.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/secondpage"
            render={props => (
              <SecondPage
                {...props}
                saveInfo={this.saveUserData.bind(this)}
                sendData={this.sendData.bind(this)}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default QuestonsBlock;
