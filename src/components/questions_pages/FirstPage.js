import React from 'react';
import './FirstPage.css';

class FirstPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [
        {text: 'Ваш пол', type: 'radio', answers: ['Мужской', 'Женский']},
        {text: 'Ваш возраст', type: 'radio', answers: ['14-20', '21-25', '26-30']},
        {text: 'Род Вашей деятельности', type: 'radio', answers: ['Школьник', 'Студент', 'Работаю']},
        {text: 'Занимаетесь ли вы спортом?', type: 'radio', answers: ['Да', 'нет']},
        {text: 'Кто предложил вам начать заниматься спортом?', type: 'radio', answers: ['Родители', 'Друзья', 'Коллеги', 'Врачи', 'Не занимаюсь']},
        {text: 'В каком возрасте вы начали заниматься спортом?', type: 'radio', answers: ['В дошкольном', 'В школьном', 'В студенческом', 'Во взрослом', 'Не занимаюсь']},
        {text: 'Какими из перечисленных ниже видов спорта вы занимаетесь?', type: 'checkbox', answers: ['Баскетбол', 'Бег', 'Атлетика', 'Хоккей', 'Борьба', 'Теннис', 'Футбол', 'Другое']},
        {text: 'Сколько раз в неделю вы занимаетесь спортом?', type: 'radio', answers: ['1-2', '3-4', '5-6', 'Каждый день', 'Не занимаюсь']},
        {text: 'Что даёт Вам спортивный образ жизни?', type: 'input'},
        {text: 'Делаете ли вы по утрам зарядку?', type: 'radio', answers: ['Да', 'Нет', 'Не всегда']},
      ],

      answers: {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
      },
    };
  }
  handleBtnClick() {
    const {answers} = this.state;
    this.props.saveInfo(answers);
    this.props.history.push('/secondpage');
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
      } else if(item.type === 'input') {
        return (
          <div key={index} className="question">
            <h3 className="question-title">{index + 1}. {item.text}</h3>
            <textarea type="text" className="input" rows="4" cols="40" placeholder="Хорошее настроение, физическую форму ..." value={this.state.answers[index + 1]} onChange={this.handleInput.bind(this, index)}/>
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
        <button className="btn" onClick={this.handleBtnClick.bind(this)}>Next page</button>
      </div>
    )
  }
}

export default FirstPage;
