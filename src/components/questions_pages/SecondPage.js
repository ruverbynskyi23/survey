import React from 'react';
import './SecondPage.css';

class SecondPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        {text: 'Получаете ли вы удовольствие от занятия спортом?', type: 'radio', answers: ['Да', 'Нет', 'Скорее да, чем нет', 'Скорее нет, чем да', 'Не знаю']},
        {text: 'Где Вы предпочитаете заниматься спортом?', type: 'radio', answers: ['На свежем вохдухе', 'Дома', 'В клубе', 'Другое']},
        {text: 'Ваш любимый вид спорта?', type: 'checkbox', answers: ['Баскетбол', 'Бег', 'Атлетика', 'Хоккей', 'Борьба', 'Теннис', 'Футбол', 'Другое']},
        {text: 'Занимаются ли спортом Ваши родители?', type: 'radio', answers: ['Да', 'Нет']},
        {text: 'Как Вы относитесь к спортивному образу жизни?', type: 'radio', answers: ['Положительно', 'Отрицательно', 'Другой ответ']},
        {text: 'Какие, на Ваш взгляд, главные причины пренебрежения современной молодежи физических нагрузок?', type: 'radio', answers: ['Занятость', 'Лень', 'Отсутствие интереса', 'Другое']},
      ],

      answers: {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
      },
    };
  }

  handleBtnClick() {
    const {answers} = this.state;
    this.props.saveInfo(answers);
    this.props.sendData();
    this.props.history.push('/finalpage');
  }

  handleCheckbox(i, e) {
    const target = e.target;
    const {answers} = this.state;
    let userData;
    
    if(!Array.isArray(answers[i + 1])) {
      userData = [];
      answers[i + 1] = userData;
      this.setState({answers}, () => {
        answers[i + 1].push(target.value);
      });
    } else {
      this.state.answers[i + 1].push(target.value);
    }
  }

  handleInput(i, e) {
    const {answers} = this.state;
    answers[i + 1] = e.target.value;

    this.setState({answers});
  }

  handleRadio(i, e) {
    const target = e.target;
    const {answers} = this.state;

    answers[i + 1] = target.value;
    this.setState({answers});
  }

  getAnswerOptions(type, answers, index) {
    if(type === "radio") {
      return answers.map((value, i) => {
        return (
          <div key={i} className="answer">
            <input type="radio" className="radio" value={value} checked={this.state.answers[index + 1] === value} onChange={this.handleRadio.bind(this, index)}/>
            <p className="answer-text">{value}</p>
          </div>
        )
      })  
    } else {
      return answers.map((value, i) => {
        return (
          <div key={i} className="answer">
            <input type="checkbox" className="checkbox" value={value} onChange={this.handleCheckbox.bind(this, index)}/>
            <p className="answer-text">{value}</p>
          </div>
        )
      })
    }
  }

  renderQuestions() {
    const {questions} = this.state;

    return questions.map((item, index) => {
      if(item.type === 'radio') {
        return (
          <div key={index} className="question">
            <h3 className="question-title">{index + 1}. {item.text}</h3>
            {this.getAnswerOptions(item.type, item.answers, index)}
          </div>
        )
      } else if(item.type === 'checkbox') {
        return (
          <div key={index} className="question">
            <h3 className="question-title">{index + 1}. {item.text}</h3>
            {this.getAnswerOptions(item.type, item.answers, index)}
          </div>
        )
      }
    });
  }

  render() {
    return (
      <div className="list-wrapper">
        {this.renderQuestions()}
        <button className="btn" onClick={this.handleBtnClick.bind(this)}>Send answers</button>
      </div>
    )
  }
}

export default SecondPage;
