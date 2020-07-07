import React from 'react';
import './FinalPage.css';

class FinalPage extends React.Component {
  handleClick() {
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="final-block">
        <h1 className="title">Спасибо!</h1>
        <span className="subtitle">Ваш ответ был сохранен и отправлен, спасибо за уделенное время.</span>
        <div className="btn-wrapper">
          <button className="btn" onClick={this.handleClick.bind(this)}>Ok</button>
        </div>
      </div>
    )
  }
}

export default FinalPage;
