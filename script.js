const quiz = [
  { id: 1, question: 'Is the bubble sort algorithm O(n)?', answer: 'false' },
  { id: 2, question: 'Are binary trees graphs as well?', answer: 'true' },
];
class Quiz {
  constructor() {
    this.question = document.querySelector('#question');
    this.answers = document.querySelectorAll('.answer');
    this.corrects = document.querySelector('#corrects');
    this.steps = document.querySelector('#steps');
    this.leftButton = document.querySelector('#moveLeft');
    this.rightButton = document.querySelector('#moveRight');
    this.confirmButton = document.querySelector('#confirm');
    this.restartButton = document.querySelector('#restart');
    this.continueButton = document.querySelector('#continue');
    this.modalShadow = document.querySelector('#shadow');
    this.modal = document.querySelector('#modal');
    this.percentage = document.querySelector('#percentage');
    this.quiz = quiz;
    this.selected = {};
    this.currentQuestion = 0;
    this.correct = 0;
    this.answered = false;
  }

  start() {
    this.set(this.currentQuestion);
    this.events();
  }

  events() {
    this.answers.forEach((answer) => {
      answer.addEventListener('change', (ev) => this.answer(ev));
    });
    this.leftButton.addEventListener('click', () => this.moveLeft());
    this.rightButton.addEventListener('click', () => this.moveRight());
    this.confirmButton.addEventListener('click', () => this.confirmAnswers());
    this.restartButton.addEventListener('click', () => this.restartQuiz());
    this.continueButton.addEventListener('click', () => this.toggleModal());
  }

  set(index) {
    this.question.textContent = `${index + 1} . ${this.quiz[index].question}`;
    this.steps.textContent = `${index + 1}/${this.quiz.length}`;
    this.toggleDisabled();
    this.toggleSelected();
    if (this.answered) {
      this.disableToggleButtons();
      this.corrects.textContent = `${this.correct}/${this.quiz.length}`;
      this.percentage.textContent = `${this.calculatePercentage()}%`;
    }
  }

  answer(ev) {
    this.selected[this.currentQuestion] = ev.target.value;
    this.toggleDisabled();
  }

  confirmAnswers() {
    for (const [key, value] of Object.entries(this.selected)) {
      if (this.quiz[key].answer === value) {
        this.correct += 1;
      }
    }
    this.answered = true;
    this.restartButton.classList.toggle('none');
    this.confirmButton.classList.toggle('none');
    this.toggleModal();
    this.set(this.currentQuestion);
  }

  restartQuiz() {
    this.selected = {};
    this.currentQuestion = 0;
    this.correct = 0;
    this.answered = false;
    this.restartButton.classList.toggle('none');
    this.answers.forEach((e) => (e.disabled = false));
    this.set(this.currentQuestion);
  }

  moveLeft() {
    this.currentQuestion -= 1;
    this.set(this.currentQuestion);
  }

  moveRight() {
    this.currentQuestion += 1;
    this.set(this.currentQuestion);
  }

  toggleDisabled() {
    if (this.currentQuestion <= 0) {
      this.leftButton.disabled = true;
    } else {
      this.leftButton.disabled = false;
    }
    if (this.currentQuestion >= this.quiz.length - 1) {
      //this.rightButton.disabled = true;
      this.rightButton.classList.add('none');
      if (!this.answered) this.confirmButton.classList.remove('none');
      if (this.answered) this.restartButton.classList.remove('none');
      if (this.questionsAreAnswered()) {
        this.confirmButton.disabled = false;
      } else {
        this.confirmButton.disabled = true;
      }
    } else {
      // this.rightButton.disabled = false;
      this.rightButton.classList.remove('none');
      this.confirmButton.classList.add('none');
      this.restartButton.classList.add('none');
    }
  }

  toggleSelected() {
    const selected = this.selected[this.currentQuestion];
    if (selected) {
      document.querySelector(`#${selected}`).checked = true;
    } else {
      this.resetSelected();
    }
  }

  disableToggleButtons() {
    this.answers.forEach((e) => (e.disabled = true));
  }

  toggleModal() {
    this.modal.classList.toggle('none');
    this.modalShadow.classList.toggle('none');
  }

  resetSelected() {
    document.querySelector('#true').checked = false;
    document.querySelector('#false').checked = false;
  }

  questionsAreAnswered() {
    return Object.keys(this.selected).length === this.quiz.length;
  }

  calculatePercentage() {
    const percent = (this.correct * 100) / this.quiz.length;
    return percent;
  }
}

const q = new Quiz();
q.start();
